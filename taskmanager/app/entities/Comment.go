package entities

type Comment struct {
	Id       int ` json:"id" xml:"id" `
	AuthorId int ` json:"authorid" xml:"authorid" `
	TaskId   int ` json:"taskid" xml:"taskid" `
	Text     string ` json:"text" xml:"text" `
}
