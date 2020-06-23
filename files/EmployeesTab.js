'use strict'

class EmployeesTab {

    #employeesView;
    #employeesModel;

    constructor() {
        this.#employeesView = new EmployeesView();
        this.#employeesModel = new EmployeesModel();
    }

    getEmployeesView() {
        return this.#employeesView;
    }

    getEmployeesModel() {
        return this.#employeesModel
    }

    addEmployee(employee) {
        this.#employeesModel.addEmployee(employee);
        this.#employeesView.addEmployee(employee);
    }

    deleteEmployee(id) {
        this.#employeesModel.deleteEmployee(id);
        this.#employeesView.deleteEmployee(id);
    }

    getEmployee(id) {
        return this.#employeesModel.getEmployee(id);
    }

    show() {

    }

    hide() {
        
    }

}