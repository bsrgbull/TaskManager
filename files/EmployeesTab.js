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

    show() {

    }

    hide() {
        
    }

}