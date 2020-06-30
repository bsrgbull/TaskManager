package controllers

import (
	"taskmanager/app/entities"
	"taskmanager/app/providers"

	"github.com/mitchellh/mapstructure"
	"github.com/revel/revel"
)

type CProject struct {
	*revel.Controller
	p providers.PProject
}

//Обработчик GET запросов с /project
func (c CProject) GetAllProjects() revel.Result {

	projects, err := c.p.GetAllProjects()
	response := entities.Resp{Data: projects, Err: err}

	return c.RenderJSON(response)
}

//Обработчик GET запросов с /project/:id
func (c CProject) GetProject(id string) revel.Result {

	project, err := c.p.GetProject(id)
	response := entities.Resp{Data: project, Err: err}

	return c.RenderJSON(response)
}

//Обработчик POST запросов с /project
func (c CProject) AddOrUpdateProject() revel.Result {
	var jsonData map[string]interface{}
	c.Params.BindJSON(&jsonData)

	var newProject entities.Project
	mapstructure.Decode(jsonData, &newProject)

	err := c.p.AddOrUpdateProject(&newProject)
	response := entities.Resp{Data: nil, Err: err}

	return c.RenderJSON(response)
}

//Обработчик DELETE запросов с /project/:id
func (c CProject) DeleteProject(id string) revel.Result {

	err := c.p.DeleteProject(id)
	response := entities.Resp{Data: nil, Err: err}

	return c.RenderJSON(response)
}
