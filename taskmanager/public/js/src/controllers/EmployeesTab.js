'use strict'

class EmployeesTab {

    #employeesView;
    #employeesModel;

    constructor() {
        this.#employeesView = new EmployeesView();
        this.#employeesModel = new EmployeesModel();
    }

    addNewEmployee(name, surname, password, login, email) {

        this.#employeesModel.addEmployee(name, surname, password, login, email)
            .then( id => {
                this.#employeesView.addNewEmployee(id.Data, name, surname, password, login, email);
            });
    }

    getEmployeesView() {
        return this.#employeesView;
    }

    getEmployeesModel() {
        return this.#employeesModel
    }

    updateEmployee(id, name, surname, password, login, email) {
        this.#employeesModel.updateEmployee(id, name, surname, password, login, email);
        this.#employeesView.updateEmployee(id, name, surname, password, login, email);
    }

    deleteEmployee(id) {
        return this.#employeesModel.deleteEmployee(id)
            .then( result => {
                console.log(result)
                this.#employeesView.deleteEmployee(id);
            });
    }

    async getEmployee(id) {
        return await this.#employeesModel.getEmployee(id);
    }

    show() {

        this.#employeesView.showEmployeesPage(this.#employeesModel);
    }

    getMapOfEmployeesFromProject(projectId) {
        return this.#employeesModel.getMapOfEmployeesFromProject(projectId);
    }

    getMapOfEmployees() {
        return this.#employeesModel.getMapOfEmployees();
    }

}