'use strict'

class TasksTab {

    showTaskPage(project) {

        $$("kanban").clearAll();

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
    }
    
    addTask(task) {
        $$("kanban").add({ id:`${task.getId()}`, status:`${task.getStatus()}`, text:`${task.getText()}`},0);
    }

    deleteTask(id) {

    }

    updateTask(id) {

    }

    addEmployee(id) {
        
    }
}