'use strict'

class EmployeesModel {

    #mapOfEmployees;
    static nextId = 0;

    static getNextId() {
        this.nextId++;
        return this.nextId;
    }

    constructor() {
        this.#mapOfEmployees = new Map();

        this.addEmployee("Сергей", "Быков", "123");
        this.addEmployee("Игорь", "Коваценко", "123");
        this.addEmployee("Леонид", "Самойлов", "123");
        this.addEmployee("Артём", "Юдаев", "123");
        this.addEmployee("Дмитрий", "Кудрявцев", "123");
        this.addEmployee("Вадим", "Сафонов", "123");
        this.addEmployee("Алёна", "Фадеева", "123");
        this.addEmployee("Виктор", "Блинов", "123");
        this.addEmployee("Роман", "Ефимов", "123");
        this.addEmployee("Валерия", "Мартынова", "123");
        this.addEmployee("Константин", "Корнилов", "123");
        this.addEmployee("Никита", "Зимин", "123");
        this.addEmployee("Максим", "Коновалов", "123");

        this.updateEmployee(1, "Сергей", "Быков", "bsrgbull", "bsrg.bull@gmail.com", 123)
    }

    addEmployee(name, surname, password) {
        let id = EmployeesModel.getNextId();

        this.#mapOfEmployees.set(id, new Employee(id, name, surname, password));

        return id;
    }

    getEmployee(id) {
        return this.#mapOfEmployees.get(id);
    }

    getEmployeesFromProject(project) {

        let map = new Map();
        this.#mapOfEmployees.forEach(function(employee, index, array) {
            if (employee.getProjectId = projectId) {
                map.set(employee.getId(), employee);
            }
        });
        return map;
        return this.#employeesModel.getEmployeesFromProject(projectId);
    }

    getMapOfEmployees() {
        return this.#mapOfEmployees;
    }

    updateEmployee(id, name, surname, login, email, password) {

        this.#mapOfEmployees.set(id, new Employee(id, name, surname, login, email, password));

    }

    deleteEmployee(id) {
        this.#mapOfEmployees.delete(id);
    }

    login(login, password) {

        let result = false;

        if (login != "" && password != "" && login != undefined && password != undefined ) {

            this.#mapOfEmployees.forEach(function(employee, index, array) {

                if ((employee.getLogin() == login || employee.getEmail() == password)
                    && employee.getPassword() == password) {

                    alert((employee.getLogin() == login || employee.getEmail() == password)
                    && employee.getPassword() == password);

                    result = employee.getId();
                    return;
                }   
            });
        }
        return result;
    }
}