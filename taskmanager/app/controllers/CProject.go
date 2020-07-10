package controllers

import (
	"strconv"
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
	err := c.Params.BindJSON(&jsonData)

	var id int

	if err == nil {
		var newProject entities.Project
		mapstructure.Decode(jsonData, &newProject)

		if err == nil {
			id, err = c.p.AddProject(&newProject)
		}
	}

	response := entities.Resp{Data: id, Err: err}

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
	err := c.Params.BindJSON(&jsonData)

	if err == nil {
		var Project entities.Project
		mapstructure.Decode(jsonData, &Project)

		if err == nil {
			err = c.p.UpdateProject(&Project)
		}
	}

	response := entities.Resp{Data: nil, Err: err}

	return c.RenderJSON(response)
}

//Обработчик DELETE запросов с /project/:id
func (c *CProject) DeleteProject(id int) revel.Result {

	err := c.p.DeleteProject(id)
	response := entities.Resp{Data: nil, Err: err}

	return c.RenderJSON(response)
}

//Обработчик POST запросов с /projectemp
func (c *CProject) AddEmployee() revel.Result {

	employeeId, err := strconv.Atoi(c.Params.Query.Get("employeeId"))

	if err == nil {
		projectId, err := strconv.Atoi(c.Params.Query.Get("projectId"))

		if err == nil {
			err = c.p.AddEmployee(employeeId, projectId)
		}
	}

	response := entities.Resp{Data: nil, Err: err}

	return c.RenderJSON(response)
}

//Обработчик DELETE запросов с /projectemp
func (c *CProject) DeleteEmployee() revel.Result {

	employeeId, err := strconv.Atoi(c.Params.Query.Get("employeeId"))

	if err == nil {
		projectId, err := strconv.Atoi(c.Params.Query.Get("projectId"))

		if err == nil {
			err = c.p.DeleteEmployee(employeeId, projectId)
		}
	}

	response := entities.Resp{Data: nil, Err: err}

	return c.RenderJSON(response)
}
