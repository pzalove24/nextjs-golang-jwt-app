package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/pzalove24/nextjs-golang-jwt-app/database"
	"github.com/pzalove24/nextjs-golang-jwt-app/routes"
)

func main() {
	database.Connect()

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
		AllowOrigins: "http://localhost:3000",
	}))

	routes.Setup(app)

	app.Listen(":8000")
}
