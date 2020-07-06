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

    updateTask(taskClicked, text, creatorId, projectId, id,
         estimatedTime, spentTime, status, color, assignedToId) {

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
        if (color == null) {
            color = taskClicked.getColor();
        }
        if (assignedToId == null) {
            assignedToId = taskClicked.getAssignedToId();
        }

        this.#tasksModel.updateTask(text, +creatorId, +projectId, +id,
                 estimatedTime, spentTime, status, color, +assignedToId);
    }

    deleteTask(id) {
        this.#tasksModel.deleteTask(id);
    }

    showTaskPage(mapOfTasks, mapOfEmployees) {

        console.log(mapOfEmployees);
        this.#tasksView.showTaskPage(mapOfTasks, mapOfEmployees);
    }

    async getTasksFromProject(projectId) {

        return await this.#tasksModel.getTasksFromProject(projectId);

    }

    addEmployeeInList(id) {
        console.log(id + "eeeeeeeeee");
        this.#tasksModel.getTask(id).then((task) => {
            console.log(task)
            this.#tasksView.addEmployeeInList(employeesTab.getEmployee(task.getAssignedToId() ) );
        });
    }
}