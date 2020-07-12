'use strict'

class EmployeesView {

    showEmployeesPage(employeesModel) {

        $$("employeesTable").clearAll();

        $$("toolbarButtonsON").show();
        $$("addTaskButton").hide();
        $$("projectName").hide();
        $$("exitButton").show();
        $$("tasksPage").hide();
        $$("projectPage").hide();
        $$("employeesPage").show();
        $$("taskButtonsOff").show();
        $$("startLabel").hide();
        $$("loginButton").hide();
        $$("registrationButton").hide();

        let addemployee = this.addEmployee;

        employeesModel.getMapOfEmployees()
            .then( map => {

                map.forEach(function(employee, index, array) {
                    addemployee(employee);
                });
            })

    }


    addEmployee(employee) {
        $$("employeesTable").add({ 
            id:`${employee.getId()}`,
            nameOfEmployee:`${employee.getName()}`,
            surnameOfEmployee:`${employee.getSurname()}`,
            login:`${employee.getLogin()}`,
            email:`${employee.getEmail()}`,
        },0);
    }

    addNewEmployee(id, name, surname, password, login, email) {
        $$("employeesTable").add({ 
            id:id,
            nameOfEmployee:name,
            surnameOfEmployee:surname,
            login:login,
            email:email,
        },0);
    }

    updateEmployee(id, name, surname, password, login, email) {
        $$("employeesTable").remove(id);
        this.addNewEmployee(id, name, surname, password, login, email);
    }

    deleteEmployee(id) {
        $$("employeesTable").remove(Number(id));
    }

    clearAll() {
        $$("employeesTable").clearAll();
    }
}