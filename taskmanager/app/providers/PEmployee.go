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

	employees, err := p.m.GetAllEmployees()

	return employees, err
}

func (p *PEmployee) GetAllEmployeesFromProject(projectId int) ([]*entities.Employee, error) {

	employees, err := p.m.GetAllEmployeesFromProject(projectId)

	return employees, err

}

//Возвращает сотрудника в виде объекта, и ошибку
func (p *PEmployee) GetEmployee(id int) (*entities.Employee, error) {

	employee, err := p.m.GetEmployee(id)

	return employee, err
}

func (p *PEmployee) UpdateEmployee(newEmployee *entities.Employee) error {

	return p.m.UpdateEmployee(newEmployee)
}

func (p *PEmployee) DeleteEmployee(id int) error {

	return p.m.DeleteEmployee(id)
}
