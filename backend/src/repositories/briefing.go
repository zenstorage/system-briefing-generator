package repositories

import (
	"briefing-generation-system/src/database"
	"briefing-generation-system/src/models"
	"time"
)

func SaveUserBriefing(userID int, title, briefing, companyName string) error {
	db, err := database.Connect()
	if err != nil {
		return err
	}
	defer db.Close()

	row := db.QueryRow(`
		INSERT INTO briefings (user_id, title, generated_content, company_name)
		VALUES ($1, $2, $3, $4);
	`, userID, title, briefing, companyName)

	if row.Err() != nil {
		return row.Err()
	}

	return nil
}

func GetUserBriefings(userID int) ([]models.BriefingData, error) {
	db, err := database.Connect()
	if err != nil {
		return nil, err
	}
	defer db.Close()

	rows, err := db.Query(`
		SELECT id, title, generated_content, company_name, created_at
		FROM briefings
		WHERE user_id = $1
		ORDER BY created_at DESC;
	`, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var briefings []models.BriefingData
	for rows.Next() {
		var briefing models.BriefingData
		var createdAt time.Time
		if err := rows.Scan(&briefing.ID, &briefing.BriefingResult.BriefingShortTitle, &briefing.BriefingResult.Briefing, &briefing.CompanyName, &createdAt); err != nil {
			return nil, err
		}
		briefing.CreatedAt = createdAt
		briefings = append(briefings, briefing)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return briefings, nil
}
