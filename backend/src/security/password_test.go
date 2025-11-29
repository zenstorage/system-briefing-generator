package security

import (
	"testing"
)

func TestHash(t *testing.T) {
	password := "mysecretpassword"
	hash, err := Hash(password)

	if err != nil {
		t.Fatalf("Hash failed: %v", err)
	}

	if len(hash) == 0 {
		t.Error("Hash returned empty bytes")
	}
}

func TestCheckPassword(t *testing.T) {
	password := "mysecretpassword"
	hash, _ := Hash(password)

	err := CheckPassword(string(hash), password)
	if err != nil {
		t.Errorf("CheckPassword failed for valid password: %v", err)
	}

	err = CheckPassword(string(hash), "wrongpassword")
	if err == nil {
		t.Error("CheckPassword succeeded for invalid password")
	}
}
