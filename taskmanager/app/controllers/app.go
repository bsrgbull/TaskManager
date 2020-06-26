package controllers

import (
	"fmt"
	"taskmanager/app"
	"taskmanager/app/controllers/DAO"

	"github.com/revel/revel"
)

type App struct {
	*revel.Controller
}

//Обработчик запросов с /
func (c App) TaskManager() revel.Result {
	return c.Render()
}

//Обработчик запросов с /employee
func (c App) GetAllEmployees() revel.Result {

	data := make(map[string]interface{})
	data["error"] = nil

	employees := DAO.GetAllEmployeesInJSON(app.DB)
	data["employee"] = employees

	return c.RenderJSON(data)

}

//Обработчик запросов с /employee/:id
func (c App) GetEmployee(id string) revel.Result {
	fmt.Println(id)
	data := make(map[string]interface{})
	data["error"] = nil

	employee := DAO.GetEmployeeInJSON(app.DB, id)
	data["employee"] = employee

	return c.RenderJSON(data)
}

func (c App) AddEmployee() revel.Result {
	return c.Render()
}

func (c App) DeleteEmployee() revel.Result {
	return c.Render()
}

func (c App) GetAllProjects() revel.Result {
	return c.Render()
}

func (c App) GetProject() revel.Result {
	return c.Render()
}

func (c App) AddProject() revel.Result {
	return c.Render()
}

func (c App) DeleteProject() revel.Result {
	return c.Render()
}

func (c App) AddTaskToProject() revel.Result {
	return c.Render()
}
