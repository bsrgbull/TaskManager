package entities

type Project struct {
	Id              int    ` json:"id" xml:"id" `
	Name            string ` json:"name" xml:"name" `
	CreatorId       int    ` json:"creatorId" xml:"creatorId" `
	AimOfTheProject string ` json:"aimOfTheProject" xml:"aimOfTheProject" `
}
