package controllers

import (

	"taskmanager/app/providers"

	"github.com/revel/revel"
)

type CEmployee struct {
	*revel.Controller
}

//Обработчик GET запросов с /employee
func (c CEmployee) GetAllEmployees() revel.Result {
	return c.RenderJSON(providers.GetAllEmployees())
}

//Обработчик GET запросов с /employee/:id
func (c CEmployee) GetEmployee(id string) revel.Result {
	return c.RenderJSON(providers.GetEmployee(id))
}

//Обработчик POST запросов с /employee
func (c CEmployee) AddOrUpdateEmployee() revel.Result {
	var jsonData map[string]interface{}
	c.Params.BindJSON(&jsonData)

	return c.RenderJSON(providers.AddOrUpdateEmployee(&jsonData))
}

//Обработчик DELETE запросов с /employee/:id
func (c CEmployee) DeleteEmployee(id string) revel.Result {
	return c.Render()
}
