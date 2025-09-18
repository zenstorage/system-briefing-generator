package handlers

import (
	response "briefing-generation-system/pkg/utils"
	"briefing-generation-system/src/models"
	"briefing-generation-system/src/services"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
)

func GetUsers(w http.ResponseWriter, r *http.Request) {
	usersLimit := r.URL.Query().Get("limit")
	if usersLimit == "" {
		usersLimit = "30"
	}
	usersLimitInt, err := strconv.Atoi(usersLimit)
	if err != nil {
		response.ResponseError(w, err, http.StatusBadRequest)
	}

	afterUser := r.URL.Query().Get("after")
	if afterUser == "" {
		afterUser = "0"
	}
	afterUserInt, err := strconv.Atoi(afterUser)
	if err != nil {
		response.ResponseError(w, err, http.StatusBadRequest)
	}

	users, err := services.GetUsers(usersLimitInt, afterUserInt)
	if err != nil {
		response.ResponseError(w, err, http.StatusInternalServerError)
	}

	response.ResponseJSON(w, users, http.StatusOK)
}

func CreateUser(w http.ResponseWriter, r *http.Request) {
	var user models.User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		response.ResponseError(w, err, http.StatusBadRequest)
		return
	}

	fmt.Printf("%v", user)

	if err := services.CreateUser(&user); err != nil {
		response.ResponseError(w, err, http.StatusInternalServerError)
		return
	}

	response.ResponseJSON(w, user, http.StatusCreated)
}
