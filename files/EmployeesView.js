'use strict'

class EmployeesView {

    showEmployeesPage() {
        $$("toolbarButtonsON").show();
        $$("addTaskButton").hide();
        $$("projectName").hide();
        $$("exitButton").show();
        $$("tasksPage").hide();
        $$("projectPage").hide();
        $$("employeesPage").show();
        $$("taskButtonsOff").hide();
    }

    showEmployeeInfo(id) {

    }

    newEmployeeForm() {

    }

    hideNewProjectForm() {

    }

    addEmployee(employee) {
        $$("employeesTable").add({ 
            nameOfEmployee:`${employee.getName()}`,
            surnameOfEmployee:`${employee.getSurname()}`,
            login:`${employee.getLogin()}`,
            email:`${employee.getEmail()}`,
        },0);
    }

    deleteEmployee(id) {
        $$("employeesTable").remove(id);
    }

    hideAll() {
        
    }
}