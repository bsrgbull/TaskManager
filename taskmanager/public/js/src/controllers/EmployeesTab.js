'use strict'

class EmployeesTab {

    #employeesView;
    #employeesModel;

    constructor() {
        this.#employeesView = new EmployeesView();
        this.#employeesModel = new EmployeesModel();
    }

    addEmployee(employee) {
        this.#employeesModel.addEmployee(employee);
        this.show();
    }

    addNewEmployee(name, surname, password, login, email) {
        let id = this.#employeesModel.addEmployee(name, surname, password, login, email);
        this.#employeesView.addNewEmployee(id, name, surname, password, login, email);
    }

    getEmployeesView() {
        return this.#employeesView;
    }

    getEmployeesModel() {
        return this.#employeesModel
    }

    getEmployeesFromArray(arrayOfEmployeesId) {
        return this.#employeesModel.getEmployeesFromArray(arrayOfEmployeesId)
    }

    updateEmployee(id, name, surname, password, login, email) {
        this.#employeesModel.updateEmployee(id, name, surname, password, login, email);
        this.#employeesView.updateEmployee(id, name, surname, password, login, email);
    }

    deleteEmployee(id) {
        this.#employeesModel.deleteEmployee(id);
        this.#employeesView.deleteEmployee(id);
        //this.show();
    }

    getEmployee(id) {
        return this.#employeesModel.getEmployee(id);
    }

    show() {

        this.#employeesView.showEmployeesPage(this.#employeesModel);
    }

    hide() {
        
    }

}