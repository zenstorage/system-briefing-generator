package auth

import (
	"briefing-generation-system/src/config"
	"net/http"
	"testing"

	jwt "github.com/dgrijalva/jwt-go"
)

func TestCreateToken(t *testing.T) {
	// Mock config.SECRET_KEY for testing
	config.SECRET_KEY = []byte("testsecret")

	userID := "123"
	tokenString, err := CreateToken(userID)

	if err != nil {
		t.Fatalf("CreateToken failed: %v", err)
	}

	if tokenString == "" {
		t.Error("CreateToken returned empty string")
	}

	// Verify token content
	token, _ := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return config.SECRET_KEY, nil
	})

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		if claims["userID"] != userID {
			t.Errorf("Expected userID %v, got %v", userID, claims["userID"])
		}
	} else {
		t.Error("Token is invalid")
	}
}

func TestExtractToken(t *testing.T) {
	req, _ := http.NewRequest("GET", "/", nil)
	req.Header.Set("Authorization", "Bearer mytoken")

	token := ExtractToken(req)
	if token != "mytoken" {
		t.Errorf("Expected token 'mytoken', got '%v'", token)
	}

	req.Header.Set("Authorization", "InvalidFormat")
	token = ExtractToken(req)
	if token != "" {
		t.Errorf("Expected empty token for invalid format, got '%v'", token)
	}
}
