package mappers

import (
	"fmt"
	"taskmanager/app"
)

type Employee struct {
	Name       string ` json:"name" xml:"name" `
	Surname    string ` json:"surname" xml:"surname" `
	Login      string ` json:"login" xml:"login" `
	Email      string ` json:"email" xml:"email" `
	Password   string ` json:"password" xml:"password" `
	EmployeeID string ` json:"id" xml:"id" `
}

//возвращает всех сотрудников в виде объектов Employee
func GetAllEmployees() (*[]Employee, error) {

	rows, err := app.DB.Query("select * from employees")

	defer rows.Close()
	employees := []Employee{}

	if err != nil {
		return &employees, err
	}

	for rows.Next() {
		i := Employee{}
		err := rows.Scan(&i.Name, &i.Surname, &i.Login, &i.Email, &i.Password, &i.EmployeeID)
		if err != nil {
			fmt.Println(err)
			continue
		}
		employees = append(employees, i)
	}
	return &employees, err
}

//возвращает всех сотрудников в виде объекта Employee
func GetEmployee(id string) (*Employee, error) {

	row, err := app.DB.Query("SELECT * FROM employees WHERE id = $1", id)

	defer row.Close()
	if err != nil {
		return nil, err
	}

	row.Next()
	i := Employee{}
	err = row.Scan(&i.Name, &i.Surname, &i.Login, &i.Email, &i.Password, &i.EmployeeID)
	if err != nil {
		fmt.Println(err)
	}

	return &i, err

	//	return &Employee{ Name: "Александр", Surname: "Балабай", Login: id, Email: "balabai@gmail.com", Password: "123", EmployeeID: ""}, nil
}

func AddOrUpdateEmployee(emp *Employee) error {
	//Проверка на существование записи в базе
	row, err := app.DB.Query("SELECT * FROM employees WHERE id = $1", emp.EmployeeID)
	defer row.Close()
	row.Next()
	i := Employee{}
	err = row.Scan(&i.Name, &i.Surname, &i.Login, &i.Email, &i.Password, &i.EmployeeID)

	if i.EmployeeID == "" {
		//Если записи нет, создаём новую
		_, err = app.DB.Exec("insert into employees (name, surname, login, email, password, id) values ($1, $2, $3, $4, $5, $6)",
			emp.Name, emp.Surname, emp.Login, emp.Email, emp.Password, emp.EmployeeID)

		return err
	}

	//Если запись есть обновляем её
	_, err = app.DB.Exec("update employees set name = $1, surname = $2, login = $3, email = $4, password = $5 where id = $6",
		emp.Name, emp.Surname, emp.Login, emp.Email, emp.Password, emp.EmployeeID)

	return err
}

func DeleteEmployee(id string) error {
	return nil
}
