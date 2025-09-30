package handlers

import (
	response "briefing-generation-system/pkg/utils"
	"briefing-generation-system/src/auth"
	"briefing-generation-system/src/models"
	"briefing-generation-system/src/services"
	"encoding/json"
	"net/http"
	"strconv"
	"time"
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

	if err := services.CreateUser(&user); err != nil {
		response.ResponseError(w, err, http.StatusInternalServerError)
		return
	}

	token, err := auth.CreateToken(strconv.Itoa(user.ID))
	if err != nil {
		response.ResponseError(w, err, http.StatusInternalServerError)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "token",
		Value:    token,
		Path:     "/",
		HttpOnly: true,
		MaxAge:   int((12 * time.Hour).Seconds()), // 43200
	})

	response.ResponseJSON(w, user, http.StatusCreated)

}

func LoginUser(w http.ResponseWriter, r *http.Request) {
	var login models.LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&login); err != nil {
		response.ResponseError(w, err, http.StatusBadRequest)
		return
	}

	token, err := services.LoginUser(login.Email, login.Password)
	if err != nil {
		response.ResponseError(w, err, http.StatusUnauthorized)
		return
	}

		http.SetCookie(w, &http.Cookie{
		Name:     "token",
		Value:    token,
		Path:     "/",
		MaxAge:   int((12 * time.Hour).Seconds()), // 43200
	})

	response.ResponseJSON(w, map[string]string{
		"token": token,
	}, http.StatusOK)
}
