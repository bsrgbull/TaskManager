package providers

import (
	"taskmanager/app/entities"
	"taskmanager/app/mappers"
)

type PTask struct {
	m mappers.MTask
}

//Возвращает id задачи и ошибку
func (p *PTask) AddTask(newTask *entities.Task) (int, error) {

	return p.m.AddTask(newTask)
}

//Возвращает все задачи в виде массива объектов и ошибку
func (p *PTask) GetAllTasksFromProject(projectId int) ([]*entities.Task, error) {

	return p.m.GetAllTasksFromProject(projectId)
}

//Возвращает задачу в виде объекта, и ошибку
func (p *PTask) GetTask(taskId int) (*entities.Task, error) {

	return p.m.GetTask(taskId)
}

func (p *PTask) UpdateTask(task *entities.Task) error {

	return p.m.UpdateTask(task)
}

func (p *PTask) DeleteTask(taskId int) error {

	return p.m.DeleteTask(taskId)
}
