package mappers

import (
	"taskmanager/app/entities"
)

type MTask struct {
}

func (m MTask) AddTask(projectId int, newTask *entities.Task) (int, error) {
	return 0, nil
}

func (m MTask) GetAllTasksFromProject(projectId int) ([]*entities.Task, error) {
	return nil, nil
}

func (m MTask) GetTask(taskId int) (*entities.Task, error) {
	return nil, nil
}

func (m MTask) UpdateTask(projectId int, newTask *entities.Task) error {
	return nil
}

func (m MTask) DeleteTask(taskId int) error {
	return nil
}