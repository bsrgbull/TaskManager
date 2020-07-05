package entities

type Employee struct {
	Name     string ` json:"name" xml:"name" `
	Surname  string ` json:"surname" xml:"surname" `
	Login    string ` json:"login" xml:"login" `
	Email    string ` json:"email" xml:"email" `
	Password string ` json:"password" xml:"password" `
	Id       int ` json:"id" xml:"id" `
}
