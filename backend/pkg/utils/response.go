package response

import (
	"encoding/json"
	"log"
	"net/http"
)

func ResponseJSON(w http.ResponseWriter, data any, statusCode int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)

	if data == nil {
		return
	}

	if err := json.NewEncoder(w).Encode(data); err != nil {
		log.Fatal(err)
	}
}

func ResponseError(w http.ResponseWriter, err error, statusCode int) {
	ResponseJSON(w, struct {
		Error string `json:"error"`
	}{
		Error: err.Error(),
	}, statusCode)
}
