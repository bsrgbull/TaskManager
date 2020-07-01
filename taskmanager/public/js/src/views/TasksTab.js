'use strict'

class TasksTab {

    showTaskPage(project) {

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

        let map = project.getMap();

        let addtask = this.addTask;
        
        map.forEach(function(item, index, array) {
            addtask(item);
        });

        let mapOfEmployees = project.getMapOfEmployees();

/*        let addemployeeinlist = this.addEmployeeInList;

        mapOfEmployees.forEach(function(item, index, array) {
            addemployeeinlist(item);
        });*/

        let addemployee = this.addEmployee;

        mapOfEmployees.forEach(function(item, index, array) {
            addemployee(item);
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

    deleteTask(id) {

    }

    updateTask(id) {

    }

    addEmployee(employee) {

      /*  $$("user_Id").getList().add({ 
            user_id: employee.getId(),
            value: employee.getSurnameAndName(), 
        });*/

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
            id: employee.getId(),
            value: employee.getSurnameAndName(), 
        });
    }
}