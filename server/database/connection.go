package database

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/pzalove24/nextjs-golang-jwt-app/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

// use godot package to load/read the .env file and
// return the value of the key
func goDotEnvVariable(key string) string {

	// load .env file
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	return os.Getenv(key)
}

func Connect() {
	dotenv := goDotEnvVariable("DSN")
	dsn := dotenv
	connection, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("could not connect to mysql")
	}

	DB = connection

	connection.AutoMigrate(&models.User{})
}
