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

    getEmployeesFromProject(project) {
        return this.#employeesModel.getEmployeesFromProject(project);
    }

    addEmployee(employee) {
        this.#employeesModel.addEmployee(employee);
        this.show();
    }

    deleteEmployee(id) {
        this.#employeesModel.deleteEmployee(id);
        this.show();
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