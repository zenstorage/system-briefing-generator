package middleware

import (
	response "briefing-generation-system/pkg/utils"
	"briefing-generation-system/src/auth"
	"briefing-generation-system/src/services"
	"context"
	"fmt"
	"net/http"
)

type contextKey string

const UserContextKey contextKey = "user"

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Printf("%#v", r.Header)
		if err := auth.ValidateToken(r); err != nil {
			response.ResponseError(w, err, http.StatusUnauthorized)
			return
		}

		fmt.Println("Token is valid")

		userID, err := auth.ExtractUserID(r)
		if err != nil {
			response.ResponseError(w, err, http.StatusBadRequest)
			return
		}

		fmt.Printf("Extracted user ID: %d\n", userID)

		user, err := services.GetUser(int(userID))
		if err != nil {
			response.ResponseError(w, err, http.StatusUnauthorized)
			return
		}

		fmt.Printf("Fetched user: %#v\n", user)

		ctx := context.WithValue(r.Context(), UserContextKey, user)
		r = r.WithContext(ctx)

		next.ServeHTTP(w, r)
	})
}
