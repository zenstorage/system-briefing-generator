package services

import (
	"briefing-generation-system/src/models"
	"briefing-generation-system/src/repositories"

	"golang.org/x/crypto/bcrypt"
)

func GetUsers(limit int, after int) ([]*models.User, error) {
	users, err := repositories.GetUsers(limit, after)
	if err != nil {
		return nil, err
	}

	return users, nil
}

func CreateUser(user *models.User) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	user.Password = string(hashedPassword)

	return repositories.CreateUser(user)
}