package providers

import (
	"taskmanager/app/entities"
	"taskmanager/app/mappers"
)

type PEmployee struct {
	m mappers.MEmployee
}

//Возвращает всех сотрудников в виде массива объектов и ошибку
func (p PEmployee) GetAllEmployees() ([]*entities.Employee, error) {

	employees, err := p.m.GetAllEmployees()

	return employees, err
}

//Возвращает сотрудника в виде объекта, и ошибку
func (p PEmployee) GetEmployee(id string) (*entities.Employee, error) {

	employee, err := p.m.GetEmployee(id)

	return employee, err
}

func (p PEmployee) AddOrUpdateEmployee(newEmployee *entities.Employee) error {

	return p.m.AddOrUpdateEmployee(newEmployee)
}

func (p PEmployee) DeleteEmployee(id string) error {

	return p.m.DeleteEmployee(id)
}
