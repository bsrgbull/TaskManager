package controllers

import (
	"fmt"
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
func (c *CProject) AddProject() revel.Result {
	var jsonData map[string]interface{}
	c.Params.BindJSON(&jsonData)

	var newProject entities.Project
	mapstructure.Decode(jsonData, &newProject)

	id, err := c.p.AddProject(&newProject)
	response := entities.Resp{Data: id, Err: err}
	fmt.Println("CProject 23---------------------")
	fmt.Println(err)
	fmt.Println(newProject)
	return c.RenderJSON(response)
}

//Обработчик GET запросов с /project
func (c *CProject) GetAllProjects() revel.Result {

	projects, err := c.p.GetAllProjects()
	response := entities.Resp{Data: projects, Err: err}

	return c.RenderJSON(response)
}

//Обработчик GET запросов с /project/:id
func (c *CProject) GetProject(id int) revel.Result {

	project, err := c.p.GetProject(id)
	response := entities.Resp{Data: project, Err: err}

	return c.RenderJSON(response)
}

//Обработчик POST запросов с /updateproject
func (c *CProject) UpdateProject() revel.Result {
	var jsonData map[string]interface{}
	c.Params.BindJSON(&jsonData)

	var newProject entities.Project
	mapstructure.Decode(jsonData, &newProject)

	err := c.p.UpdateProject(&newProject)
	response := entities.Resp{Data: nil, Err: err}

	return c.RenderJSON(response)
}

//Обработчик DELETE запросов с /project/:id
func (c *CProject) DeleteProject(id int) revel.Result {

	err := c.p.DeleteProject(id)
	response := entities.Resp{Data: nil, Err: err}

	return c.RenderJSON(response)
}
