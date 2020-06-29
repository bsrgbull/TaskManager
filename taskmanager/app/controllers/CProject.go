package controllers

import (

	//	"taskmanager/app/controllers/DAO"

	"github.com/revel/revel"
)

type CProject struct {
	*revel.Controller
}

//Обработчик GET запросов с /project
func (c CProject) GetAllProjects() revel.Result {
	return c.Render()
}

//Обработчик GET запросов с /project/:id
func (c CProject) GetProject(id string) revel.Result {
	return c.Render()
}

//Обработчик POST запросов с /project
func (c CProject) AddOrUpdateProject() revel.Result {
	return c.Render()
}

//Обработчик DELETE запросов с /project/:id
func (c CProject) DeleteProject(id string) revel.Result {
	return c.Render()
}

//Обработчик GET запросов с /project/:id/:taskid
func (c CProject) AddOrUpdateTask(projectId string) revel.Result {
	return c.Render()
}

//Обработчик POST запросов с /project/:id/
func (c CProject) GetTaskFromProject(taskId string) revel.Result {
	return c.Render()
}
