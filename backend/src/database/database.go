package database

import (
	"briefing-generation-system/src/config"
	"fmt"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

func Connect() (*sqlx.DB, error) {
	dataSourceNameString := fmt.Sprintf("host=%s user=%s password=%s dbname=%s sslmode=require",
		config.PGHOST,
		config.PGUSER,
		config.PGPASSWORD,
		config.PGDATABASE,
	)
	// dataSourceNameString := config.POSTGRES_URL

	db, err := sqlx.Connect("postgres", dataSourceNameString)
	if err != nil {
		return nil, err
	}

	return db, nil
}
