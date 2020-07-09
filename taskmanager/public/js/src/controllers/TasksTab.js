'use strict'

class TasksTab {

    #tasksModel;
    #tasksView;

    constructor() {
        this.#tasksView = new TasksView();
        this.#tasksModel = new TasksModel();
    }

    addTask(task) {
        this.#tasksModel.addTask(task.getId(), task.getCreatorId(),
                                    task.getProjectId() );
        this.#tasksView.addTask(task);
    }

    async addNewTask(text, creatorId, projectId) {

        let result = await this.#tasksModel.addTask(text, creatorId, projectId);

        let id;

        if (result.Err == null) {
            id = result.Data;
        } else {
            console.log(result.Err);
            return result.Err;
        }

        this.#tasksView.addNewTask(text, id);
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

    showTaskPage(mapOfTasks, mapOfEmployees) {
        this.#tasksView.showTaskPage(mapOfTasks, mapOfEmployees);
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