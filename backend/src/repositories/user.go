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

	err = db.Select(&users, `SELECT id, name, email FROM Users LIMIT $1 OFFSET $2;`, limit, after)
	if err != nil {
		return nil, err
	}

	return users, nil
}

func GetUser(userID int) (*models.User, error) {
	var user *models.User

	db, err := database.Connect()
	if err != nil {
		return user, err
	}
	defer db.Close()

	err = db.Select(&user, `SELECT id, name, email, password FROM Users LIMIT 1 WHERE id = $1;`, userID)
	if err != nil {
		return user, err
	}

	return user, nil
}

func GetUserByEmail(email string) (*models.User, error) {
	db, err := database.Connect()
	if err != nil {
		return nil, err
	}
	defer db.Close()

	var user models.User
	err = db.Get(&user, `
        SELECT id, name, email, password 
        FROM Users 
        WHERE email = $1
        LIMIT 1;`, email)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func CreateUser(user *models.User) error {
	db, err := database.Connect()
	if err != nil {
		return err
	}
	defer db.Close()

	row := db.QueryRow(`
		INSERT INTO Users (name, email, password)
		VALUES ($1, $2, $3)
		RETURNING id;
	`, user.Name, user.Email, user.Password)

	var id int
	if err = row.Scan(&id); err != nil {
		return err
	}

	user.ID = id
	return nil
}
