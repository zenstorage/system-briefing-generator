package config

var (
	PGHOST          string
	PGHOST_UNPOOLED string
	PGUSER          string
	PGDATABASE      string
	PGPASSWORD      string

	GEMINI_API_KEY string

	SECRET_KEY []byte

	// POSTGRES_URL string
)

func Load() {
	// err := godotenv.Load("../.env")
	// if err != nil {
	// 	log.Fatal("Error loading .env file")
	// }

	PGHOST = "ep-sparkling-sky-acojwddh-pooler.sa-east-1.aws.neon.tech"
	PGHOST_UNPOOLED = "ep-sparkling-sky-acojwddh.sa-east-1.aws.neon.tech"
	PGUSER = "neondb_owner"
	PGDATABASE = "neondb"
	PGPASSWORD = "npg_ZvIAwN23Fpfy"

	GEMINI_API_KEY = "AIzaSyAHDOYAIwOLwf2fKn5lx-OUOvJ_mE9n3lo"
	SECRET_KEY = []byte("t00jtJSwW0VkEO9Hj+pfTX5Kyfp1tmgLCTf1IzrSX8bXKuyuZhERh6nFoJLgpvVEoMwS0RwxTkYnrvuE6TJc0Q==")

	// POSTGRES_URL = os.Getenv("POSTGRES_URL")
}
