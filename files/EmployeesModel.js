'use strict'

class EmployeesModel {

    #mapOfEmployees;


    constructor() {
        this.#mapOfEmployees = new Map();

        this.addEmployee(new Employee("Сергей", "Быков", "123"));
        this.addEmployee(new Employee("Дмитрий", "Кудрявцев", "123"));
        this.addEmployee(new Employee("Вадим", "Сафонов", "123"));
        this.addEmployee(new Employee("Алёна", "Фадеева", "123"));
        this.addEmployee(new Employee("Виктор", "Блинов", "123"));
        this.addEmployee(new Employee("Роман", "Ефимов", "123"));
        this.addEmployee(new Employee("Валерия", "Мартынова", "123"));
        this.addEmployee(new Employee("Илья", "Самойлов", "123"));
        this.addEmployee(new Employee("Константин", "Корнилов", "123"));
        this.addEmployee(new Employee("Никита", "Зимин", "123"));
        this.addEmployee(new Employee("Максим", "Коновалов", "123"));
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