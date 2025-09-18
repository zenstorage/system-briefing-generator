package models

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
