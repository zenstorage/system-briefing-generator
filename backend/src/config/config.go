package config

import "os"

var (
	POSTGRES_USER     string
	POSTGRES_PASSWORD string
	POSTGRES_DBNAME   string

	GEMINI_API_KEY string

	SECRET_KEY []byte

	POSTGRES_URL string
)

func Load() {
	// err := godotenv.Load("../.env")
	// if err != nil {
	// 	log.Fatal("Error loading .env file")
	// }

	// POSTGRES_USER = os.Getenv("POSTGRES_USER")
	// POSTGRES_PASSWORD = os.Getenv("POSTGRES_PASSWORD")
	// POSTGRES_DBNAME = os.Getenv("POSTGRES_DBNAME")
	// GEMINI_API_KEY = os.Getenv("GEMINI_API_KEY")
	// SECRET_KEY = os.Getenv("SECRET_KEY")
	POSTGRES_USER = "postgres"
	POSTGRES_PASSWORD = "postgres"
	POSTGRES_DBNAME = "BriefingGenerationSystem"
	GEMINI_API_KEY = "AIzaSyAHDOYAIwOLwf2fKn5lx-OUOvJ_mE9n3lo"
	SECRET_KEY = []byte("t00jtJSwW0VkEO9Hj+pfTX5Kyfp1tmgLCTf1IzrSX8bXKuyuZhERh6nFoJLgpvVEoMwS0RwxTkYnrvuE6TJc0Q==")

	POSTGRES_URL = os.Getenv("POSTGRES_URL")
}
