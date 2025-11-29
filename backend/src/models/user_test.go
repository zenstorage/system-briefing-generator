package models

import (
	"reflect"
	"testing"
)

func TestUserStruct(t *testing.T) {
	user := User{
		ID:       1,
		Name:     "Test User",
		Email:    "test@example.com",
		Password: "password123",
	}

	if user.ID != 1 {
		t.Errorf("Expected ID 1, got %d", user.ID)
	}
	if user.Name != "Test User" {
		t.Errorf("Expected Name 'Test User', got '%s'", user.Name)
	}
	if user.Email != "test@example.com" {
		t.Errorf("Expected Email 'test@example.com', got '%s'", user.Email)
	}
}

func TestLoginRequestStruct(t *testing.T) {
	loginReq := LoginRequest{
		Email:    "test@example.com",
		Password: "password123",
	}

	if loginReq.Email != "test@example.com" {
		t.Errorf("Expected Email 'test@example.com', got '%s'", loginReq.Email)
	}
}

func TestBriefingStruct(t *testing.T) {
	briefing := Briefing{
		ID:           1,
		BriefingForm: "Form Data",
		Briefing:     "Generated Briefing",
		UserID:       1,
	}

	if briefing.ID != 1 {
		t.Errorf("Expected ID 1, got %d", briefing.ID)
	}
	if briefing.UserID != 1 {
		t.Errorf("Expected UserID 1, got %d", briefing.UserID)
	}
}

func TestUserTags(t *testing.T) {
	userType := reflect.TypeOf(User{})

	field, _ := userType.FieldByName("ID")
	if tag := field.Tag.Get("json"); tag != "id,omitempty" {
		t.Errorf("Expected json tag 'id,omitempty', got '%s'", tag)
	}
	if tag := field.Tag.Get("db"); tag != "id" {
		t.Errorf("Expected db tag 'id', got '%s'", tag)
	}

	field, _ = userType.FieldByName("Name")
	if tag := field.Tag.Get("json"); tag != "name,omitempty" {
		t.Errorf("Expected json tag 'name,omitempty', got '%s'", tag)
	}
}
