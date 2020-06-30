package controllers

import (
	"github.com/revel/revel"
)

type CTask struct {
	*revel.Controller
}

//Обработчик GET запросов с /project/:id/:taskid
func (c CTask) AddOrUpdateTask(projectId string) revel.Result {
	return c.Render()
}

//Обработчик POST запросов с /project/:id/
func (c CTask) GetTaskFromProject(taskId string) revel.Result {
	return c.Render()
}
