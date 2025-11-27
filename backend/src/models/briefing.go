package models

type BriefingData struct {
	ID             int            `json:"id,omitempty"`
	CreatedAt      any            `json:"created_at,omitempty"`
	CompanyName    string         `json:"company_name,omitempty"`
	Industry       string         `json:"industry,omitempty"`
	TargetAudience string         `json:"target_audience,omitempty"`
	Problem        string         `json:"problem,omitempty"`
	Solution       string         `json:"solution,omitempty"`
	Objectives     string         `json:"objectives,omitempty"`
	Timeline       string         `json:"timeline,omitempty"`
	Budget         string         `json:"budget,omitempty"`
	BriefingResult BriefingResult `json:"briefing_result"`
}

type BriefingResult struct {
	Briefing              string `json:"briefing"`
	BriefingShortTitle    string `json:"briefing_short_title"`
	SuggestionAdjustments string `json:"suggestion_adjustments_and_improvements"`
	SuggestionContent     string `json:"suggestion_creation_of_content"`
	SuggestionMarking     string `json:"suggestion_marking_plan"`
}

type BriefingForm struct {
	Company                    Company                    `json:"company"`
	Goals                      Goals                      `json:"goals"`
	TargetAudience             TargetAudience             `json:"target_audience"`
	ProductsServices           ProductsServices           `json:"products_services"`
	Differentiators            Differentiators            `json:"differentiators"`
	CommunicationSalesChannels CommunicationSalesChannels `json:"communication_sales_channels"`
	ToneOfVoice                ToneOfVoice                `json:"tone_of_voice"`
	Deliverables               Deliverables               `json:"deliverables"`
}

type Company struct {
	Name        string `json:"name"`
	Industry    string `json:"industry"`
	Description string `json:"description"`
	Location    string `json:"location"`
	FoundedYear string `json:"founded_year"`
}

type Goals struct {
	Main              []string `json:"main"`
	QuantitativeGoals []string `json:"quantitative_goals"`
}

type TargetAudience struct {
	Age          string   `json:"age"`
	Genre        string   `json:"genre"`
	Location     string   `json:"location"`
	NeedsPains   string   `json:"needs_pains"`
	ChannelsUsed []string `json:"channels_used"`
}

type ProductsServices struct {
	Main             []string `json:"main"`
	PriceRange       string   `json:"price_range"`
	CustomerBenefits []string `json:"customer_benefits"`
}
type Differentiators struct {
	Competitive []string `json:"competitive"`
	AddedValue  []string `json:"added_value"`
}

type CommunicationSalesChannels struct {
	Current []string `json:"current"`
	Desired []string `json:"desired"`
}

type ToneOfVoice struct {
	Personality string   `json:"personality"`
	Keywords    []string `json:"keywords"`
}

type Deliverables struct {
	Items     []string `json:"items"`
	Deadlines string   `json:"deadlines"`
	Budget    string   `json:"budget"`
}
