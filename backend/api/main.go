package main

import (
	"briefing-generation-system/src/config"
	"briefing-generation-system/src/handlers"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

var app *mux.Router

func main() {
	config.Load()

	app = mux.NewRouter()

	app.HandleFunc("/briefing", handlers.GetBriefing).Methods("POST")
	app.HandleFunc("/users", handlers.GetUsers).Methods("GET")
	app.HandleFunc("/users", handlers.CreateUser).Methods("POST")

	log.Fatal(http.ListenAndServe(":3000", app))
}

func Handler(w http.ResponseWriter, r *http.Request) {
	app.ServeHTTP(w, r)
}

// func init() {
// 	config.Load()

// 	app = mux.NewRouter()

// 	app.HandleFunc("/briefing", handlers.GetBriefing).Methods("POST")
// 	app.HandleFunc("/users", handlers.GetUsers).Methods("GET")
// 	app.HandleFunc("/users", handlers.CreateUser).Methods("POST")
// }

// func Handler(w http.ResponseWriter, r *http.Request) {
// 	app.ServeHTTP(w, r)
// }
