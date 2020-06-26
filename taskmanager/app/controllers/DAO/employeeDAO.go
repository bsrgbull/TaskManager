package DAO

import (
	"database/sql"
	"fmt"
)

type employee struct {
	Name       string ` json:"name" xml:"name" `
	Surname    string ` json:"surname" xml:"surname" `
	Login      string ` json:"login" xml:"login" `
	Email      string ` json:"email" xml:"email" `
	Password   string ` json:"password" xml:"password" `
	EmployeeID string ` json:"id" xml:"id" `
}

//возвращает всех сотрудников в виде JSON
func GetAllEmployeesInJSON(DB *sql.DB) *[]employee {
	rows, err := DB.Query("select * from employees")
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	employees := []employee{}

	for rows.Next() {
		i := employee{}
		err := rows.Scan(&i.Name, &i.Surname, &i.Login, &i.Email, &i.Password, &i.EmployeeID)
		if err != nil {
			fmt.Println(err)
			continue
		}
		employees = append(employees, i)
	}
	return &employees
}

func GetEmployeeInJSON(DB *sql.DB, id string) *employee {
	fmt.Println(id)
	row, err := DB.Query("select * from employees where id = '$1'", id)
	if err != nil {
		fmt.Println(err)
	}
	defer row.Close()
	empl := employee{}
	//	row.Next()
	err = row.Scan(empl.Name, empl.Surname, empl.Login, empl.Email, empl.Password, empl.EmployeeID)
	if err != nil {
		fmt.Println(err)
	}

	return &empl
}
