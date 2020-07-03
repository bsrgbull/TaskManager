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

    addNewTask(text, creatorId, projectId) {
        let id = this.#tasksModel.addTask(text, creatorId, projectId);
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

    updateTask() {

    }

    deleteTask(id) {
        this.#tasksModel.deleteTask(id);
    }

    showTaskPage(mapOfTasks, mapOfEmployees) {
        this.#tasksView.showTaskPage(mapOfTasks, mapOfEmployees);
    }

    getTasksFromProject(projectId) {
        return this.#tasksModel.getTasksFromProject(projectId);
    }
}