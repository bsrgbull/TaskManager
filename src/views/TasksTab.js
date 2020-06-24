'use strict'

class TasksTab {

    showTaskPage(project) {

        $$("kanban").clearAll();
        $$("listOfEmployees").clearAll();

        $$("toolbarButtonsON").show();
        $$("addTaskButton").show();
        $$("projectName").show();
        $$("exitButton").show();
        $$("tasksPage").show();
        $$("projectPage").hide();
        $$("taskButtonsOff").hide();
        $$("loginButton").hide();
        $$("registrationButton").hide();
        $$("startLabel").hide();

        let addtask = this.addTask;
        let map = project.getMap();
        
        map.forEach(function(item, index, array) {
            addtask(item);
        });

        let addemployee = this.addEmployee;
        let mapOfEmployees = project.getMapOfEmployees();

        mapOfEmployees.forEach(function(item, index, array) {
            addemployee(item);
        });
    }
    
    addTask(task) {
        $$("kanban").add({ id:`${task.getId()}`, status:`${task.getStatus()}`, text:`${task.getText()}`},0);
    }

    deleteTask(id) {

    }

    updateTask(id) {

    }

    addEmployee(employee) {
        $$("listOfEmployees").add({
            id: employee.getId(),
            title: employee.getSurnameAndName(),
        },0);
    }

    addEmployeesInModalWindow(employeesModel, lastProject){

        employeesModel.getMapOfEmployees().forEach(function(employee, index, array) {
            //Если сотрудника ещё нет в проекте, добавляем в список
            if (!lastProject.getMapOfEmployees().has(index)) {

                $$("employeesTableInModalWindow").add({ 
                    idOfEmployeeInModalWindow:`${employee.getId()}`,
                    nameOfEmployeeInModalWindow:`${employee.getName()}`,
                    surnameOfEmployeeInModalWindow:`${employee.getSurname()}`,
                },0);
            }
        });

    }
}