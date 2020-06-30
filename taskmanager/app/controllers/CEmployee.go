package controllers

import (
	"taskmanager/app/entities"
	"taskmanager/app/providers"

	"github.com/mitchellh/mapstructure"
	"github.com/revel/revel"
)

type CEmployee struct {
	*revel.Controller
	p providers.PEmployee
}

//Обработчик GET запросов с /employee
func (c CEmployee) GetAllEmployees() revel.Result {

	employees, err := c.p.GetAllEmployees()
	response := entities.Resp{Data: employees, Err: err}

	return c.RenderJSON(response)
}

//Обработчик GET запросов с /employee/:id
func (c CEmployee) GetEmployee(id string) revel.Result {

	employee, err := c.p.GetEmployee(id)
	response := entities.Resp{Data: employee, Err: err}

	return c.RenderJSON(response)
}

//Обработчик POST запросов с /employee
func (c CEmployee) AddOrUpdateEmployee() revel.Result {
	var jsonData map[string]interface{}
	c.Params.BindJSON(&jsonData)

	var newEmployee entities.Employee
	mapstructure.Decode(jsonData, &newEmployee)

	err := c.p.AddOrUpdateEmployee(&newEmployee)
	response := entities.Resp{Data: nil, Err: err}

	return c.RenderJSON(response)
}

//Обработчик DELETE запросов с /employee/:id
func (c CEmployee) DeleteEmployee(id string) revel.Result {

	err := c.p.DeleteEmployee(id)
	response := entities.Resp{Data: nil, Err: err}

	return c.RenderJSON(response)
}
