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

        this.updateEmployee(1, "Сергей", "Быков", 123, "bsrgbull", "bsrg.bull@gmail.com")
    }

    addEmployee(name, surname, password, login, email) {
        let id = EmployeesModel.getNextId();

        this.#mapOfEmployees.set(+id, new Employee(+id, name, surname, password, login, email));

        return id;
    }

    getEmployee(id) {
        return this.#mapOfEmployees.get(+id);
    }

    getEmployeesFromArray(arrayOfEmployeesId) {

        let map = new Map();
            
        for (let employeeId of arrayOfEmployeesId) {
            map.set(employeeId, this.getEmployee(employeeId))
        }
        return map;
    }

    getMapOfEmployees() {
        return this.#mapOfEmployees;
    }

    updateEmployee(id, name, surname, password, login, email) {

        this.#mapOfEmployees.set(+id, new Employee(id, name, surname, password, login, email));

    }

    deleteEmployee(id) {
        this.#mapOfEmployees.delete(Number(id));
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