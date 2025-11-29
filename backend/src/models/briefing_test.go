package models

import (
	"reflect"
	"testing"
)

func TestBriefingTags(t *testing.T) {
	briefingType := reflect.TypeOf(Briefing{})

	field, _ := briefingType.FieldByName("ID")
	if tag := field.Tag.Get("json"); tag != "id" {
		t.Errorf("Expected json tag 'id', got '%s'", tag)
	}
	if tag := field.Tag.Get("db"); tag != "id" {
		t.Errorf("Expected db tag 'id', got '%s'", tag)
	}

	field, _ = briefingType.FieldByName("BriefingForm")
	if tag := field.Tag.Get("json"); tag != "briefing_form" {
		t.Errorf("Expected json tag 'briefing_form', got '%s'", tag)
	}
}
