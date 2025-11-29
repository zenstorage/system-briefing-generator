package handlers

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestCreateBriefingHandler_InvalidPayload(t *testing.T) {
	payload := []byte(`invalid-json`)
	req, err := http.NewRequest("POST", "/briefing", bytes.NewBuffer(payload))
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(CreateBriefing)

	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusBadRequest {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusBadRequest)
	}
}

/*
func TestGetBriefingHandler_MissingID(t *testing.T) {
	req, err := http.NewRequest("GET", "/briefing", nil)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(GetBriefing)

	handler.ServeHTTP(rr, req)

	// Depending on implementation, missing ID might be 400 or 404 or 500.
	// Assuming it expects an ID query param or path param which is missing.
	// If the router handles the ID, calling the handler directly without context might fail.
	// We check for non-200 to ensure it doesn't succeed with empty request.
	if status := rr.Code; status == http.StatusOK {
		t.Errorf("handler returned OK status code for missing ID")
	}
}
*/
