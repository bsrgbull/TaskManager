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
	err := c.Params.BindJSON(&jsonData)

	var id int

	if err == nil {
		var newEmployee entities.Employee
		err = mapstructure.Decode(jsonData, &newEmployee)

		if err == nil {
			id, err = c.p.AddEmployee(&newEmployee)
		}
	}

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
	err := c.Params.BindJSON(&jsonData)

	if err == nil {
		var Employee entities.Employee
		err = mapstructure.Decode(jsonData, &Employee)

		if err == nil {
			err = c.p.UpdateEmployee(&Employee)
		}
	}

	response := entities.Resp{Data: nil, Err: err}

	return c.RenderJSON(response)
}

//Обработчик DELETE запросов с /employee/:id
func (c *CEmployee) DeleteEmployee(id int) revel.Result {

	err := c.p.DeleteEmployee(id)
	response := entities.Resp{Data: nil, Err: err}

	return c.RenderJSON(response)
}

//Обработчик POST запросов с /login
func (c *CEmployee) Login() revel.Result {

	fmt.Println("CEmployee96---------------------")


	login := c.Params.Query.Get("login")

	password := c.Params.Query.Get("password")

	id, err := c.p.Login(login, password)

	fmt.Println("CEmployee---------------------")
	fmt.Println(err)

	response := entities.Resp{Data: id, Err: err}

	return c.RenderJSON(response)
}