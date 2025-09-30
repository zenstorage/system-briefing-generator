package services

import (
	"briefing-generation-system/src/auth"
	"briefing-generation-system/src/models"
	"briefing-generation-system/src/repositories"
	"briefing-generation-system/src/security"
	"strconv"
)

func GetUsers(limit int, after int) ([]*models.User, error) {
	users, err := repositories.GetUsers(limit, after)
	if err != nil {
		return nil, err
	}

	return users, nil
}

func GetUser(userID int) (*models.User, error) {
	user, err := repositories.GetUser(userID)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func LoginUser(email, password string) (string, error) {
	user, err := repositories.GetUserByEmail(email)
	if err != nil {
		return "", err
	}

	if err = security.CheckPassword(user.Password, password); err != nil {
		return "", err
	}

	return auth.CreateToken(strconv.Itoa(user.ID))
}

func CreateUser(user *models.User) error {
	hashedPassword, err := security.Hash(user.Password)
	if err != nil {
		return err
	}

	user.Password = string(hashedPassword)

	return repositories.CreateUser(user)
}
