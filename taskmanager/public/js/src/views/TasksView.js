'use strict'

class TasksView {


    showTaskPage(mapOfTasks, mapOfEmployees) {

        $$("kanban").clearAll();
        $$("listOfEmployees").clearAll();

        $$("kanban").getUserList().$height = 650;


        $$("toolbarButtonsON").show();
        $$("addTaskButton").show();
        $$("projectName").show();
        $$("exitButton").show();
        $$("tasksPage").show();
        $$("projectPage").hide();
        $$("taskButtonsOff").show();
        $$("loginButton").hide();
        $$("registrationButton").hide();
        $$("startLabel").hide();

        let addtask = this.addTask;

        mapOfTasks.forEach(function(task, index, array) {
            addtask(task);
        });

        let addemployee = this.addEmployee;

        mapOfEmployees.forEach(function(employee, index, array) {
            addemployee(employee);
        });

    }
    
    addTask(task) {
        $$("kanban").add({ id:`${task.getId()}`,
                           status:`${task.getStatus()}`,
                           text:`${task.getText()}`,
                           user_id:`${task.getAssignedToId()}`,
                           color:`${task.getColor()}`
                        },0);
    }

    addNewTask(text, id) {
        
            $$("kanban").add({  
                id:id,
                status:`Создано`,
                text:text,
            },0);

    }

    updateTask(id) {

    }

    deleteTask(id) {
        
    }

    addEmployee(employee) {
        $$("listOfEmployees").add({
            id: employee.getId(),
            title: employee.getSurnameAndName(),
        },0);
    }

    addEmployeesInModalWindow(employee){

        $$("employeesTableInModalWindow").add({ 
            idOfEmployeeInModalWindow:`${employee.getId()}`,
            nameOfEmployeeInModalWindow:`${employee.getName()}`,
            surnameOfEmployeeInModalWindow:`${employee.getSurname()}`,
        },0);
    }

    //Добавление сотрудников UserList виджета kanban
    addEmployeeInList(employee) {
        let users = $$("kanban").getUsers();
            users.add({ 
                id: employee.getId(),
                value: employee.getSurnameAndName(), 
            });
    }
}