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
            .then( result => {
                if (result != "error") {
                    if (result.Err == null){
                        this.#employeesView.addNewEmployee(result.Data, name, surname, password, login, email);
                    } else {
                        webix.message(result.Severity + " Код:" + result.Code + " " + 
                                                    result.Message + " " + result.Detail);
                    }
                } else {
                    webix.message("Операция не удалась");
                }
            },
            error => {
                webix.message("Операция не удалась");
            }
        );
    }

    getEmployeesView() {
        return this.#employeesView;
    }

    getEmployeesModel() {
        return this.#employeesModel
    }

    updateEmployee(id, name, surname, password, login, email) {

        this.#employeesModel.updateEmployee(id, name, surname, password, login, email)
            .then( result => {
                    if (result != "error") {
                        if (result.Err == null) {
                            this.#employeesView.updateEmployee(id, name, surname, password, login, email);
                        } else {
                            webix.message(result.Severity + " Код:" + result.Code + " " + 
                                                        result.Message + " " + result.Detail);
                        }
                    } else {
                        webix.message("Операция не удалась");
                    }
                },
                error => {
                    webix.message("Операция не удалась");
                }
            );
    }

    deleteEmployee(id) {
        return this.#employeesModel.deleteEmployee(id)
                    .then( result => {
                            if ( result != "error" ) {
                                if (result.Err == null) {
                                    this.#employeesView.deleteEmployee(id);
                                } else {
                                    return result.Err;
                                }
                            } else {
                                return "error"
                            }
                        },
                        error => { return "error" }
                    );
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