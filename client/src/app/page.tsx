"use client";

import React, { useState, useEffect } from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface HeaderProps {
  sections: ReadonlyArray<{
    title: string;
    url: string;
  }>;
  title: string;
}

export default function Header() {
  const [message, setMessage] = useState("");
  const [auth, setAuth] = useState(false);
  const router = useRouter();

  const logout = async () => {
    await fetch("http://localhost:8000/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    router.push("/login");
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://localhost:8000/api/user", {
          credentials: "include",
        });
        const content = await response.json();
        setMessage(`Hi ${content.name}`);
        setAuth(true);
      } catch (error) {
        setMessage("You are not logged in");
        setAuth(false);
        console.log("message", error);
      }
    })();
  });

  let menu;

  if (!auth) {
    menu = (
      <Stack direction={"row"} spacing={2}>
        <Link href="/login" passHref>
          <Button variant="outlined" size="small">
            Sign in
          </Button>
        </Link>
        <Link href="/register" passHref>
          <Button variant="outlined" size="small">
            Sign up
          </Button>
        </Link>
      </Stack>
    );
  } else {
    menu = (
      <Link href="#" passHref>
        <Button variant="outlined" size="small" onClick={logout}>
          Sign out
        </Button>
      </Link>
    );
  }

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Typography
          component="h5"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flex: 1 }}
        >
          NextJs-Golang JWT Website
        </Typography>
        {menu}
      </Toolbar>
      <Typography>{message}</Typography>
    </React.Fragment>
  );
}
