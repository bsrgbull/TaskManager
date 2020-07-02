package mappers

import (
	"taskmanager/app/entities"
)

type MTask struct {
}

func (m MTask) GetAllTasksFromProject(projectId string) ([]*entities.Task, error) {
	return nil, nil
}

func (m MTask) GetTask(taskId string) (*entities.Task, error) {
	return nil, nil
}

func (m MTask) AddOrUpdateTask(projectId string, newTask *entities.Task) error {
	return nil
}

func (m MTask) DeleteTask(taskId string) error {
	return nil
}
