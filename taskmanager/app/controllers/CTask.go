package controllers

import (
	"taskmanager/app/entities"
	"taskmanager/app/providers"

	"github.com/mitchellh/mapstructure"
	"github.com/revel/revel"
)

type CTask struct {
	*revel.Controller
	p providers.PTask
}

//Обработчик GET запросов с /tasks/:projectId
func (c CTask) GetAllTasksFromProject(projectId string) revel.Result {

	tasks, err := c.p.GetAllTasksFromProject(projectId)
	response := entities.Resp{Data: tasks, Err: err}

	return c.RenderJSON(response)
}

//Обработчик GET запросов с /task/:taskId
func (c CTask) GetTask(taskId string) revel.Result {

	task, err := c.p.GetTask(taskId)
	response := entities.Resp{Data: task, Err: err}

	return c.RenderJSON(response)
}

//Обработчик POST запросов с /task/:projectId
func (c CTask) AddOrUpdateTask(projectId string) revel.Result {
	var jsonData map[string]interface{}
	c.Params.BindJSON(&jsonData)

	var newTask entities.Task
	mapstructure.Decode(jsonData, &newTask)

	err := c.p.AddOrUpdateTask(projectId, &newTask)
	response := entities.Resp{Data: nil, Err: err}

	return c.RenderJSON(response)
}

//Обработчик Delete запросов с /task/:taskId
func (c CTask) DeleteTask(taskId string) revel.Result {

	err := c.p.DeleteTask(taskId)
	response := entities.Resp{Data: nil, Err: err}

	return c.RenderJSON(response)
}
