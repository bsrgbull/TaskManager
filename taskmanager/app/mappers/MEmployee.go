package mappers

import (
	"taskmanager/app"
	"taskmanager/app/entities"
)

type MEmployee struct {
}

//Создаёт нового сотрудника
func (m MEmployee) AddEmployee(newEmployee *entities.Employee) (int, error) {

	var maxId int = 0

	for _, employee := range app.MapOfEmployees {
		if employee.Id > maxId {
			maxId = employee.Id
		}
	}

	newEmployee.Id = maxId + 1

	app.MapOfEmployees[maxId+1] = newEmployee

	var err error = nil

	return maxId + 1, err
}

//Возвращает всех сотрудников в виде объектов Employee
func (m MEmployee) GetAllEmployees() ([]*entities.Employee, error) {

	employees := []*entities.Employee{}
	var err error = nil

	for _, emp := range app.MapOfEmployees {
		employees = append(employees, emp)
	}

	return employees, err
}

//Возвращает сотрудника в виде объекта Employee
func (m MEmployee) GetEmployee(id int) (*entities.Employee, error) {

	var i *entities.Employee
	var err error = nil

	i = app.MapOfEmployees[id]

	return i, err

}

//Обновляет сотрудника
func (m MEmployee) UpdateEmployee(emp *entities.Employee) error {

	app.MapOfEmployees[emp.Id] = emp

	return nil
}

//Удаляет сотрудника
func (m MEmployee) DeleteEmployee(id int) error {

	delete(app.MapOfEmployees, id)
	var err error = nil

	return err
}
