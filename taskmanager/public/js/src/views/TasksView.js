'use strict'

class TasksView {


    showTaskPage(mapOfTasks, mapOfEmployees) {

        $$("kanban").clearAll();
        $$("listOfEmployees").clearAll();
      /*  for (var key in $$("kanban").getUserList()) {
            // этот код будет вызван для каждого свойства объекта
            // ..и выведет имя свойства и его значение
//            if ($$("kanban").getUserList()[key] == 9) {
                alert( "Ключ: " + key + " значение: " + $$("kanban").getUserList()[key] );
//            }
          }*/
        $$("kanban").getUserList().$height = 650;
//        $$("kanban").getUsers().clearAll();

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
      //  console.log($$("kanban").data)
       /* $$("kanban").data({    //Сортировка виджета Канбан
            view:"kanbanlist", 
       //     status:"Создано"
          }).sort({
          //  dir:"desc",
            by:"id",
            as:"int"      
          });  */
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
            id: employee.getId() + "employee",
            title: employee.getSurnameAndName(),
        },0);
    }

    addEmployeesInModalWindow(employeesModel, currentProject){

        employeesModel.getMapOfEmployees().forEach(function(employee, index, array) {
            //Если сотрудника ещё нет в проекте, добавляем в список
            if (!currentProject.getArrayOfEmployeesId().includes(index)) {

                $$("employeesTableInModalWindow").add({ 
                    idOfEmployeeInModalWindow:`${employee.getId()}`,
                    nameOfEmployeeInModalWindow:`${employee.getName()}`,
                    surnameOfEmployeeInModalWindow:`${employee.getSurname()}`,
                },0);
            }
        });

    }

    //Добавление сотрудников UserList виджета kanban
    addEmployeeInList(employeePromise) {
        let users = $$("kanban").getUsers();

        employeePromise.then( employee => {

            users.add({ 
                id: employee.getId() + "userListEmployee",
                value: employee.getSurnameAndName(), 
            });

        });
    }
}