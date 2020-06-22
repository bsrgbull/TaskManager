'use strict'

class EmployeesModel {

    #mapOfEmployees;

    constructor() {
        this.#mapOfEmployees = new Map();
    }

    getAllEmployeesSurnamesAndNames() {

    }

    getEmployee(id) {
        return this.#mapOfEmployees.get(id);
    }

    addEmployee(employee) {
        if (employee instanceof Employee) {
            this.#mapOfEmployees.set(employee.getId(), employee);
        } else alert("Ошибка: в EmployeeModel можно добавлять только объекты типа Employee");
    }

    deleteEmployee(id) {
        this.#mapOfEmployees.delete(id);
    }
}