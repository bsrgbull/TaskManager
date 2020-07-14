'use strict'

class TasksTab {

    #tasksModel;
    #tasksView;

    constructor() {
        this.#tasksView = new TasksView();
        this.#tasksModel = new TasksModel();
    }

    addNewTask(text, creatorId, projectId) {

        this.#tasksModel.addTask(text, creatorId, projectId)
            .then( result => {
                if (result != "error") {
                    if (result.Err == null){
                        this.#tasksView.addNewTask(text, result.Data);
                    } else {
                        webix.message("ОШИБКА")
                        console.log(result);
                    }
                } else {
                    webix.message("Операция не удалась");
                }
            },
            error => {
                webix.message("Операция не удалась");
            }
        );
    }

    getTasksModel() {
        return this.#tasksModel;
    }

    getTasksView() {
        return this.#tasksView;
    }

    getTask(id) {

        return this.#tasksModel.getTask(Number(id));

    }

    updateTask(taskClicked, text, creatorId, projectId, id,
         estimatedTime, spentTime, status, colour, assignedToId) {

        if (text == null) {
            text = taskClicked.getText();
        }
        if (creatorId == null) {
            creatorId = taskClicked.getCreatorId();
        }
        if (projectId == null) {
            projectId = taskClicked.getProjectId();
        }
        if (estimatedTime == null) {
            estimatedTime = taskClicked.getEstimatedTime();
        }
        if (spentTime == null) {
            spentTime = taskClicked.getSpentTime();
        }
        if (status == null) {
            status = taskClicked.getStatus();
        }
        if (colour == null) {
            colour = taskClicked.getColor();
        }
        if (assignedToId == null) {
            assignedToId = taskClicked.getAssignedToId();
        }

        this.#tasksModel.updateTask(text, +creatorId, +projectId, +id,
                 +estimatedTime, +spentTime, status, colour, +assignedToId);  
    }

    deleteTask(id) {
        this.#tasksModel.deleteTask(id);
    }

    showTaskPage(mapOfTasks, mapOfEmployees, mapOfComments, currentUser) {
        this.#tasksView.showTaskPage(mapOfTasks, mapOfEmployees, mapOfComments, currentUser);
    }

    async getTasksFromProject(projectId) {

        return await this.#tasksModel.getTasksFromProject(projectId);

    }

    addEmployeeInList(id) {
        this.#tasksModel.getTask(id).then((task) => {

            employeesTab.getEmployee(task.getAssignedToId() ).then( employee => {

                    this.#tasksView.addEmployeeInList(employee);
                });
        });
    }

    setMapOfTasks(mapOfTasks) {
        this.#tasksModel.setMapOfTasks(mapOfTasks);
    }

    getMapOfTasks() {
        return this.#tasksModel.getMapOfTasks();
    }
}