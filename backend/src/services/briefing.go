package services

import (
	"briefing-generation-system/src/models"
	"briefing-generation-system/src/repositories"
)

func SaveBriefing(user *models.User, briefing *models.BriefingData) error {
	userID := user.ID
	briefingTitle := briefing.BriefingResult.BriefingShortTitle
	briefingContent := briefing.BriefingResult.Briefing
	companyName := briefing.CompanyName

	return repositories.SaveUserBriefing(userID, briefingTitle, briefingContent, companyName)
}

func GetUserBriefings(userID int) ([]models.BriefingData, error) {
	return repositories.GetUserBriefings(userID)
}
