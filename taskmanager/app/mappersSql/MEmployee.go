package mappers

import (
	"fmt"
	"taskmanager/app"
	"taskmanager/app/entities"
)

type MEmployee struct {
}

//Возвращает всех сотрудников в виде объектов Employee
func (m MEmployee) GetAllEmployees() ([]*entities.Employee, error) {

	rows, err := app.DB.Query("select * from employees")

	if err != nil {
		return nil, err
	}

	defer rows.Close()
	employees := []*entities.Employee{}

	for rows.Next() {
		i := entities.Employee{}
		err := rows.Scan(&i.Name, &i.Surname, &i.Login, &i.Email, &i.Password, &i.Id)

		if err != nil {
			fmt.Println(err)
			continue
		}
		employees = append(employees, &i)
	}

	return employees, err
}

//Возвращает сотрудника в виде объекта Employee
func (m MEmployee) GetEmployee(id int) (*entities.Employee, error) {

	row, err := app.DB.Query("SELECT * FROM employees WHERE id = $1", id)

	if err != nil {
		return nil, err
	}

	defer row.Close()

	row.Next()
	i := entities.Employee{}
	err = row.Scan(&i.Name, &i.Surname, &i.Login, &i.Email, &i.Password, &i.Id)

	if err != nil {
		fmt.Println(err)
	}

	return &i, err

}

//Создаёт нового сотрудника, либо, если он уже есть, обновляет
func (m MEmployee) AddOrUpdateEmployee(emp *entities.Employee) error {

	//Проверка на существование записи в базе
	row, err := app.DB.Query("SELECT * FROM employees WHERE id = $1", emp.Id)

	//добавить обработку ошибки
	defer row.Close()
	row.Next()
	i := entities.Employee{}
	err = row.Scan(&i.Name, &i.Surname, &i.Login, &i.Email, &i.Password, &i.Id)

	if i.Id == 0 {
		//Если записи нет, создаём новую
		_, err = app.DB.Exec("insert into employees (name, surname, login, email, password, id) values ($1, $2, $3, $4, $5, $6)",
			emp.Name, emp.Surname, emp.Login, emp.Email, emp.Password, emp.Id)

		return err
	}

	//Если запись есть обновляем её
	_, err = app.DB.Exec("update employees set name = $1, surname = $2, login = $3, email = $4, password = $5 where id = $6",
		emp.Name, emp.Surname, emp.Login, emp.Email, emp.Password, emp.Id)

	return err
}

//Удаляет сотрудника
func (m MEmployee) DeleteEmployee(id int) error {

	_, err := app.DB.Exec("DELETE FROM employees WHERE id = $1", id)
	if err != nil {
		panic(err) //!!!
	}

	return err
}
