package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/pzalove24/nextjs-golang-jwt-app/controllers"
)

func Setup(app *fiber.App) {
	app.Get("/", controllers.Hello)
	app.Get("/api/user", controllers.User)
	app.Post("/api/register", controllers.Register)
	app.Post("/api/login", controllers.Login)
	app.Post("/api/logout", controllers.Logout)

}
