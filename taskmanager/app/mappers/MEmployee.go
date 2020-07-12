package mappers

import (
	"fmt"
	"taskmanager/app"
	"taskmanager/app/entities"
)

type MEmployee struct {
}

//Создаёт нового сотрудника
func (m *MEmployee) AddEmployee(newEmployee *entities.Employee) (int, error) {

	query := "INSERT INTO employees (name, surname, login, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING id"

	var id int

	err := app.DB.QueryRow(query,
		newEmployee.Name,
		newEmployee.Surname,
		newEmployee.Login,
		newEmployee.Email,
		newEmployee.Password).Scan(&id)

	return id, err

}

//Возвращает всех сотрудников в виде объектов Employee
func (m *MEmployee) GetAllEmployees() ([]*entities.Employee, error) {

	query := "SELECT name, surname, login, email, password, id FROM employees"

	rows, err := app.DB.Query(query)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	employees := []*entities.Employee{}

	for rows.Next() {
		i := entities.Employee{}
		err = rows.Scan(&i.Name, &i.Surname, &i.Login, &i.Email, &i.Password, &i.Id)

		if err != nil {
			fmt.Println(err)
			continue
		}
		employees = append(employees, &i)
	}

	return employees, err
}

//Возвращает всех сотрудников из проекта в виде объектов Employee
func (m *MEmployee) GetAllEmployeesFromProject(projectId int) ([]*entities.Employee, error) {

	query := "SELECT name, surname, login, email, password, id " +
		"FROM employees INNER JOIN employees_in_projects " +
		"ON employees.id = employees_in_projects.employee_id " +
		"WHERE project_id = $1"

	rows, err := app.DB.Query(query, projectId)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	employees := []*entities.Employee{}

	for rows.Next() {
		i := entities.Employee{}
		err = rows.Scan(&i.Name, &i.Surname, &i.Login, &i.Email, &i.Password, &i.Id)

		if err != nil {
			fmt.Println(err)
			continue
		}
		employees = append(employees, &i)
	}

	return employees, err
}

//Возвращает сотрудника в виде объекта Employee
func (m *MEmployee) GetEmployee(id int) (*entities.Employee, error) {

	query := "SELECT name, surname, login, email, password, id FROM employees WHERE id = $1"

	row, err := app.DB.Query(query, id)

	if err != nil {
		return nil, err
	}

	defer row.Close()

	row.Next()
	i := entities.Employee{}
	err = row.Scan(&i.Name, &i.Surname, &i.Login, &i.Email, &i.Password, &i.Id)

	return &i, err

}

//Обновляет сотрудника
func (m *MEmployee) UpdateEmployee(emp *entities.Employee) error {

	var query string;
	var err error;

	if emp.Password == "nil" {
		query = "UPDATE employees SET name = $1, surname = $2, login = $3, email = $4 WHERE id = $6"

		_, err = app.DB.Exec(query,
			emp.Name, emp.Surname, emp.Login, emp.Email, emp.Id)
	} else {
		query = "UPDATE employees SET name = $1, surname = $2, login = $3, email = $4, password = $5 WHERE id = $6"

		fmt.Println(emp.Password)
		_, err = app.DB.Exec(query,
			emp.Name, emp.Surname, emp.Login, emp.Email, emp.Password, emp.Id)
	}

	return err
}

//Удаляет сотрудника
func (m *MEmployee) DeleteEmployee(id int) error {

	_, err := app.DB.Exec("DELETE FROM employees WHERE id = $1", id)

	return err
}

//Возвращает true если попытка залогиниться удалась, в противном случае - false
func (m *MEmployee) Login(login string, password string) (int, error) {

	id := 0

	query := "SELECT id FROM employees WHERE (login = $1 OR email = $2) AND password = $3"

	err := app.DB.QueryRow(query, login, login, password).Scan(&id)

	return id, err

}