package main

import (
	"briefing-generation-system/src/config"
	"briefing-generation-system/src/handlers"
	"briefing-generation-system/src/middleware"
	"net/http"

	"github.com/gorilla/mux"
)

var app *mux.Router

// func main() {
// 	config.Load()

// 	app = mux.NewRouter()

// 	app.HandleFunc("/login", handlers.LoginUser).Methods("POST")

// 	api := app.PathPrefix("/api").Subrouter()
// 	api.Use(middleware.AuthMiddleware)

// 	api.HandleFunc("/briefing", handlers.GetBriefing).Methods("POST")
// 	api.HandleFunc("/users", handlers.GetUsers).Methods("GET")
// 	api.HandleFunc("/users", handlers.CreateUser).Methods("POST")

// 	log.Fatal(http.ListenAndServe(":3000", app))
// }

// func Handler(w http.ResponseWriter, r *http.Request) {
// 	app.ServeHTTP(w, r)
// }

func init() {
	config.Load()

	app = mux.NewRouter()

	app.HandleFunc("/login", handlers.LoginUser).Methods("POST")
	app.HandleFunc("/users", handlers.CreateUser).Methods("POST")

	api := app.PathPrefix("/api").Subrouter()
	api.Use(middleware.AuthMiddleware)

	api.HandleFunc("/briefing", handlers.GetBriefing).Methods("POST")
	api.HandleFunc("/users", handlers.GetUsers).Methods("GET")
}

func Handler(w http.ResponseWriter, r *http.Request) {
	app.ServeHTTP(w, r)
}
