package providers

import (
	"taskmanager/app/entities"
	"taskmanager/app/mappers"
)

type PEmployee struct {
	m mappers.MEmployee
}

func (p *PEmployee) AddEmployee(newEmployee *entities.Employee) (int, error) {

	return p.m.AddEmployee(newEmployee)
}

//Возвращает всех сотрудников в виде массива объектов и ошибку
func (p *PEmployee) GetAllEmployees() ([]*entities.Employee, error) {

	return p.m.GetAllEmployees()
}

func (p *PEmployee) GetAllEmployeesFromProject(projectId int) ([]*entities.Employee, error) {

	return p.m.GetAllEmployeesFromProject(projectId)
}

//Возвращает сотрудника в виде объекта, и ошибку
func (p *PEmployee) GetEmployee(id int) (*entities.Employee, error) {

	return p.m.GetEmployee(id)
}

func (p *PEmployee) UpdateEmployee(newEmployee *entities.Employee) error {

	return p.m.UpdateEmployee(newEmployee)
}

func (p *PEmployee) DeleteEmployee(id int) error {

	return p.m.DeleteEmployee(id)
}
