package entities

type Project struct {
	Id              string ` json:"id" xml:"id" `
	Name            string ` json:"name" xml:"name" `
	CreatorId       string ` json:"creatorId" xml:"creatorId" `
	AimOfTheProject string ` json:"aimOfTheProject" xml:"aimOfTheProject" `
}
