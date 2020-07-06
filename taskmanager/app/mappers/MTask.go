package mappers

import (
	"fmt"
	"taskmanager/app"
	"taskmanager/app/entities"
)

type MTask struct {
}

//  /task
func (m MTask) AddTask(newTask *entities.Task) (int, error) {

	var maxId int = 0

	for _, task := range app.MapOfTasks {
		if task.Id > maxId {
			maxId = task.Id
		}
	}

	newTask.Id = maxId + 1

	app.MapOfTasks[maxId+1] = newTask

	var err error = nil

	return maxId + 1, err
}

//	/tasks/:projectId
func (m MTask) GetAllTasksFromProject(projectId int) ([]*entities.Task, error) {

	tasks := []*entities.Task{}
	var err error = nil

	for _, task := range app.MapOfTasks {
		if task.ProjectId == projectId {
			tasks = append(tasks, task)
		}
	}

	return tasks, err
}

//	/task/:taskId
func (m MTask) GetTask(taskId int) (*entities.Task, error) {

	var i *entities.Task
	var err error = nil

	i = app.MapOfTasks[taskId]

	return i, err
}

//	/updatetask
func (m MTask) UpdateTask(task *entities.Task) error {
	fmt.Println(task)
	app.MapOfTasks[task.Id] = task

	return nil
}

//	/task/:taskId
func (m MTask) DeleteTask(taskId int) error {

	delete(app.MapOfTasks, taskId)
	var err error = nil

	return err
}
