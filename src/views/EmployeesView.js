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
        $$("taskButtonsOff").hide();

        let addemployee = this.addEmployee;

        employeesModel.getMapOfEmployees().forEach(function(item, index, array) {
            addemployee(item);
        });

    }


    addEmployee(employee) {
        $$("employeesTable").add({ 
            idOfEmployee:`${employee.getId()}`,
            nameOfEmployee:`${employee.getName()}`,
            surnameOfEmployee:`${employee.getSurname()}`,
            login:`${employee.getLogin()}`,
            email:`${employee.getEmail()}`,
        },0);
    }

    deleteEmployee(id) {
        $$("employeesTable").remove(id);
    }

    clearAll() {
        $$("employeesTable").clearAll();
    }
}