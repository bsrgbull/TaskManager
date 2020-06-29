package providers

import (
	"taskmanager/app/mappers"

	"github.com/mitchellh/mapstructure"
)

//возвращает всех сотрудников в виде карты
func GetAllEmployees() map[string]interface{} {

	employees, err := mappers.GetAllEmployees()

	data := make(map[string]interface{})
	data["error"] = err

	data["employee"] = employees

	return data
}

//возвращает сотрудника в виде карты
func GetEmployee(id string) map[string]interface{} {

	employee, err := mappers.GetEmployee(id)

	data := make(map[string]interface{})
	data["error"] = err

	data["employee"] = employee

	return data
}

func AddOrUpdateEmployee(jsonData *map[string]interface{}) error {
	var newEmployee mappers.Employee
	mapstructure.Decode(jsonData, &newEmployee)

	err := mappers.AddOrUpdateEmployee(&newEmployee)

	return err
}

func DeleteEmployee(id string) error {
	return nil
}
