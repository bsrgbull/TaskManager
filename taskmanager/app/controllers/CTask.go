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

//Обработчик POST запросов с /task
func (c *CTask) AddTask() revel.Result {
	var jsonData map[string]interface{}
	err := c.Params.BindJSON(&jsonData)

	var id int

	if err == nil {
		var newTask entities.Task
		err = mapstructure.Decode(jsonData, &newTask)

		if err == nil {
			id, err = c.p.AddTask(&newTask)
		}
	}

	response := entities.Resp{Data: id, Err: err}

	return c.RenderJSON(response)
}

//Обработчик GET запросов с /tasks/:projectId
func (c *CTask) GetAllTasksFromProject(projectId int) revel.Result {

	tasks, err := c.p.GetAllTasksFromProject(projectId)
	response := entities.Resp{Data: tasks, Err: err}

	return c.RenderJSON(response)
}

//Обработчик GET запросов с /task/:taskId
func (c *CTask) GetTask(taskId int) revel.Result {

	task, err := c.p.GetTask(taskId)
	response := entities.Resp{Data: task, Err: err}

	return c.RenderJSON(response)
}

//Обработчик POST запросов с /updatetask
func (c *CTask) UpdateTask() revel.Result {
	var jsonData map[string]interface{}
	err := c.Params.BindJSON(&jsonData)

	if err == nil {
		var task entities.Task
		err = mapstructure.Decode(jsonData, &task)

		if err == nil {
			err = c.p.UpdateTask(&task)
		}
	}

	response := entities.Resp{Data: nil, Err: err}

	return c.RenderJSON(response)
}

//Обработчик Delete запросов с /task/:taskId
func (c *CTask) DeleteTask(taskId int) revel.Result {

	err := c.p.DeleteTask(taskId)
	response := entities.Resp{Data: nil, Err: err}

	return c.RenderJSON(response)
}
