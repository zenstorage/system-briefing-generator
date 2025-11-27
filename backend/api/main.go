package handler

import (
	"briefing-generation-system/src/config"
	"briefing-generation-system/src/handlers"
	"briefing-generation-system/src/middleware"
	"fmt"
	"net/http"

	_ "briefing-generation-system/docs"

	"github.com/gorilla/mux"
	httpSwagger "github.com/swaggo/http-swagger"
)

// @title Briefing Generation System API
// @version 1.0
// @description This is the API for the Briefing Generation System.
// @termsOfService http://swagger.io/terms/
// @contact.name API Support
// @contact.url http://www.swagger.io/support
// @contact.email support@swagger.io
// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html
// @host localhost:3000
// @BasePath /
// @securityDefinitions.apikey ApiKeyAuth
// @in header
// @name Authorization
var app *mux.Router

func init() {
	config.Load()

	app = mux.NewRouter()
	app.Use(middleware.LoggingMiddleware)
	app.Use(middleware.CorsMiddleware)

	app.PathPrefix("/swagger").Handler(httpSwagger.WrapHandler)

	app.HandleFunc("/login", handlers.LoginUser).Methods("POST", "OPTIONS")
	app.HandleFunc("/register", handlers.CreateUser).Methods("POST", "OPTIONS")

	api := app.PathPrefix("/api").Subrouter()
	api.Use(middleware.AuthMiddleware)

	api.HandleFunc("/briefings", handlers.GetBriefing).Methods("POST", "OPTIONS")
	api.HandleFunc("/briefings", handlers.GetBriefings).Methods("GET", "OPTIONS")
	api.HandleFunc("/users/id", handlers.GetUser).Methods("GET", "OPTIONS")
	api.HandleFunc("/users", handlers.GetUsers).Methods("GET", "OPTIONS")

	fmt.Println("Server starting on port 3000...")
	fmt.Println("Swagger UI is available at /swagger")
	// log.Fatal(http.ListenAndServe(":3000", app))
}

func Handler(w http.ResponseWriter, r *http.Request) {
	app.ServeHTTP(w, r)
}
