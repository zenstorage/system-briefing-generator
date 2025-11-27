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

	"github.com/gorilla/mux"
)

// GetUser godoc
// @Summary Get a user
// @Description Get a user by ID
// @Tags users
// @Accept  json
// @Produce  json
// @Param id path int true "User ID"
// @Success 200 {object} models.User
// @Failure 400 {object} response.Error
// @Failure 404 {object} response.Error
// @Router /api/users/{id} [get]
// @Security ApiKeyAuth
func GetUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	userIDStr := vars["id"]

	userID, err := strconv.Atoi(userIDStr)
	if err != nil {
		response.ResponseError(w, err, http.StatusBadRequest)
		return
	}

	user, err := services.GetUser(userID)
	if err != nil {
		response.ResponseError(w, err, http.StatusBadRequest)
	}

	response.ResponseJSON(w, user, http.StatusOK)
}

// GetUsers godoc
// @Summary Get users
// @Description Get a list of users
// @Tags users
// @Accept  json
// @Produce  json
// @Param limit query int false "Limit"
// @Param after query int false "After"
// @Success 200 {array} models.User
// @Failure 400 {object} response.Error
// @Router /api/users [get]
// @Security ApiKeyAuth
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
		response.ResponseError(w, err, http.StatusBadRequest)
	}

	response.ResponseJSON(w, users, http.StatusOK)
}

// CreateUser godoc
// @Summary Create a new user
// @Description Create a new user
// @Tags auth
// @Accept  json
// @Produce  json
// @Param user body models.User true "User"
// @Success 201 {object} map[string]string
// @Failure 400 {object} response.Error
// @Failure 500 {object} response.Error
// @Router /register [post]
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

	// http.SetCookie(w, &http.Cookie{
	// 	Name:     "token",
	// 	Value:    token,
	// 	Path:     "/",
	// 	HttpOnly: true,
	// 	MaxAge:   int((12 * time.Hour).Seconds()), // 43200
	// })

	response.ResponseJSON(w, map[string]string{
		"token":            token,
		"token_expiration": strconv.FormatInt(time.Now().Add(12*time.Hour).UnixMilli(), 10),
	}, http.StatusCreated)

}

// LoginUser godoc
// @Summary Login a user
// @Description Login a user
// @Tags auth
// @Accept  json
// @Produce  json
// @Param login body models.LoginRequest true "Login"
// @Success 200 {object} map[string]string
// @Failure 400 {object} response.Error
// @Failure 401 {object} response.Error
// @Router /login [post]
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

	// http.SetCookie(w, &http.Cookie{
	// 	Name:   "token",
	// 	Value:  token,
	// 	Path:   "/",
	// 	MaxAge: int((12 * time.Hour).Seconds()), // 43200
	// })

	response.ResponseJSON(w, map[string]string{
		"token":            token,
		"token_expiration": strconv.FormatInt(time.Now().Add(12*time.Hour).UnixMilli(), 10),
	}, http.StatusOK)
}
