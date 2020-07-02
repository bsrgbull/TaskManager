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

    getTasksModel() {
        return this.#tasksModel;
    }

    getTasksView() {
        return this.#tasksView;
    }

    getTask(id) {
        this.#tasksModel.getTask(id);
    }

    showTaskPage(mapOfTasks) {
        this.#tasksView.showTaskPage(mapOfTasks);
    }

    getTasksFromProject(id) {
        return this.#tasksModel.getTasksFromProject(id);
    }
}