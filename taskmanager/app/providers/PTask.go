package providers

import (
	"taskmanager/app/entities"
	"taskmanager/app/mappers"
)

type PTask struct {
	m mappers.MTask
}

//Возвращает все задачи в виде массива объектов и ошибку
func (p PTask) GetAllTasksFromProject(projectId string) ([]*entities.Task, error) {
	tasks, err := p.m.GetAllTasksFromProject(projectId)

	return tasks, err
}

//Возвращает задачу в виде объекта, и ошибку
func (p PTask) GetTask(taskId string) (*entities.Task, error) {

	task, err := p.m.GetTask(taskId)

	return task, err
}

func (p PTask) AddOrUpdateTask(projectId string, newTask *entities.Task) error {
	return p.m.AddOrUpdateTask(projectId, newTask)
}

func (p PTask) DeleteTask(taskId string) error {
	return nil
}
