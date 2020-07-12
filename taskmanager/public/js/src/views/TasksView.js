'use strict'

class TasksView {


    showTaskPage(mapOfTasks, mapOfEmployees, mapOfComments, currentUser) {

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

        $$("comments").setCurrentUser(currentUser.getId());


        let addtask = this.addTask;

        mapOfTasks.forEach(function(task, index, array) {

            let arrayOfComments = [];

            mapOfComments.forEach(comment => {

                if (comment.getTaskId() == task.getId() ) {
                    arrayOfComments.push(
                        {
                            id: comment.getId(),
                            user_id: comment.getAuthorId(),
                            text: comment.getText()
                        });
                }
            });

            addtask(task, arrayOfComments);
        });

        let addemployee = this.addEmployee;

        mapOfEmployees.forEach(function(employee, index, array) {
            addemployee(employee);
        });

    }
    
    addTask(task, arrayOfComments) {
        $$("kanban").add({ id:`${task.getId()}`,
                           status:`${task.getStatus()}`,
                           text:`${task.getText()}`,
                           user_id:`${task.getAssignedToId()}`,
                           color:`${task.getColor()}`,
                           comments: arrayOfComments,
                        },0);
    }

    addNewTask(text, id) {
        
            $$("kanban").add({  
                id:id,
                status:`Создано`,
                text:text,
            },0);

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
            image: `https://docs.webix.com/samples/63_kanban/common/imgs/${employee.getId() % 10}.jpg`
            });
    }
}