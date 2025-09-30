package models

type User struct {
	ID       int    `json:"id,omitempty" db:"id"`
	Name     string `json:"name,omitempty" db:"name"`
	Email    string `json:"email,omitempty" db:"email"`
	Password string `json:"password,omitempty" db:"password"`
}

type LoginRequest struct {
	Email    string `json:"email" db:"email"`
	Password string `json:"password" db:"password"`
}

type Briefing struct {
	ID           int    `json:"id" db:"id"`
	BriefingForm string `json:"briefing_form" db:"briefing_form"`
	Briefing     string `json:"briefing" db:"briefing"`
	UserID       int    `json:"user_id" db:"user_id"`
}
