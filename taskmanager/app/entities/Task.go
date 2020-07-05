package entities

type Task struct {
	Text string	
    EstimatedTime float32
    SpentTime float32
    Id int
    Status string
    Color string
    CreatorId int
    AssignedToId int
    ProjectId int
}
