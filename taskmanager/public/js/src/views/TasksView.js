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

/*        let addemployeeinlist = this.addEmployeeInList;

        mapOfEmployees.forEach(function(item, index, array) {
            addemployeeinlist(item);
        });*/

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
        $$("kanban").add({  id:id,
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
    addEmployeeInList(employee) {
        let users = $$("kanban").getUsers();
     /*   $$("user_Id").getList().add({ 
            user_id: employee.getId(),
            value: employee.getSurnameAndName(), 
        });*/
    /*    alert($$("kanban").$view.innerHTML);
          for (var key in $$("kanban").$view.innerH) {
            // этот код будет вызван для каждого свойства объекта
            // ..и выведет имя свойства и его значение
          
            alert( "Ключ: " + key + " значение: " + $$("kanban").$view[key] );
          }*/
        users.add({ 
            id: employee.getId() + "userListEmployee",
            value: employee.getSurnameAndName(), 
        });
    }
}