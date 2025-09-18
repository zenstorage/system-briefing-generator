package repositories

import (
	"briefing-generation-system/src/database"
	"briefing-generation-system/src/models"
)

func GetUsers(limit int, after int) ([]*models.User, error) {
	db, err := database.Connect()
	if err != nil {
		return nil, err
	}
	defer db.Close()

	users := []*models.User{}

	err = db.Select(&users, `SELECT id, name, email FROM public."Users" LIMIT $1 OFFSET $2;`, limit, after)
	if err != nil {
		return nil, err
	}

	return users, nil
}

func CreateUser(user *models.User) error {
	db, err := database.Connect()
	if err != nil {
		return err
	}
	defer db.Close()

	_, err = db.Exec(`INSERT INTO public."Users" (name, email, password) VALUES ($1, $2, $3);`, user.Name, user.Email, user.Password)

	return err
}