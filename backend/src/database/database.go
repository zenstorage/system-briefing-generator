package database

import (
	"briefing-generation-system/src/config"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

func Connect() (*sqlx.DB, error) {
	// dataSourceNameString := fmt.Sprintf("user=%s password=%s dbname=%s sslmode=disable",
	// 	config.POSTGRES_USER, config.POSTGRES_PASSWORD, config.POSTGRES_DBNAME)
	dataSourceNameString := config.POSTGRES_URL

	db, err := sqlx.Connect("postgres", dataSourceNameString)
	if err != nil {
		return nil, err
	}

	return db, nil
}
