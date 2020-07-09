package controllers

import (
	"fmt"
	"taskmanager/app/entities"
	"taskmanager/app/providers"

	"github.com/mitchellh/mapstructure"
	"github.com/revel/revel"
)

type CEmployee struct {
	*revel.Controller
	p providers.PEmployee
}

//Обработчик POST запросов с /employee
func (c *CEmployee) AddEmployee() revel.Result {
	var jsonData map[string]interface{}
	c.Params.BindJSON(&jsonData)

	var newEmployee entities.Employee
	mapstructure.Decode(jsonData, &newEmployee)

	id, err := c.p.AddEmployee(&newEmployee)
	response := entities.Resp{Data: id, Err: err}

	return c.RenderJSON(response)
}

//Обработчик GET запросов с /employee
func (c *CEmployee) GetAllEmployees() revel.Result {

	employees, err := c.p.GetAllEmployees()
	response := entities.Resp{Data: employees, Err: err}

	return c.RenderJSON(response)
}

//Обработчик GET запросов с /employees/:projectid
func (c *CEmployee) GetAllEmployeesFromProject(projectid int) revel.Result {

	employees, err := c.p.GetAllEmployeesFromProject(projectid)
	response := entities.Resp{Data: employees, Err: err}

	return c.RenderJSON(response)
}

//Обработчик GET запросов с /employee/:id
func (c *CEmployee) GetEmployee(id int) revel.Result {

	employee, err := c.p.GetEmployee(id)
	response := entities.Resp{Data: employee, Err: err}

	return c.RenderJSON(response)
}

//Обработчик POST запросов с /updateemployee
func (c *CEmployee) UpdateEmployee() revel.Result {
	var jsonData map[string]interface{}
	c.Params.BindJSON(&jsonData)

	fmt.Println(jsonData)

	var newEmployee entities.Employee
	mapstructure.Decode(jsonData, &newEmployee)
	fmt.Println(newEmployee)

	err := c.p.UpdateEmployee(&newEmployee)
	response := entities.Resp{Data: nil, Err: err}

	return c.RenderJSON(response)
}

//Обработчик DELETE запросов с /employee/:id
func (c *CEmployee) DeleteEmployee(id int) revel.Result {

	err := c.p.DeleteEmployee(id)
	response := entities.Resp{Data: nil, Err: err}

	return c.RenderJSON(response)
}
