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
	tasks, err := p.m.GetAllTasksFromProject(projectId)

	return tasks, err
}

//Возвращает задачу в виде объекта, и ошибку
func (p *PTask) GetTask(taskId int) (*entities.Task, error) {

	task, err := p.m.GetTask(taskId)

	return task, err
}

func (p *PTask) UpdateTask(task *entities.Task) error {

	return p.m.UpdateTask(task)
}

func (p *PTask) DeleteTask(taskId int) error {
	return p.m.DeleteTask(taskId)
}
