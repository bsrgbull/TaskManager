'use strict'

class ProjectsTab {

    #projectView;
    #projectsModel;

    constructor() {
        this.#projectView = new ProjectView();
        this.#projectsModel = new ProjectsModel();
    }

    getProjectView() {
        return this.#projectView;
    }

    getProjectsModel() {
        return this.#projectsModel
    }

    addProject(project) {
        this.#projectsModel.addProject(project);
        this.show();
    }

    deleteProject(id) {
        this.#projectsModel.deleteProject(id);
        this.show();
    }

    getProject(id) {
        return this.#projectsModel.getProject(id);
    }

    addTaskToProject(projectId, task) {
        this.#projectsModel.addTaskToProject(projectId, task);
    }

    show() {
        this.#projectView.showProjectPage(this.#projectsModel);  
    }

    hide() {
        
    }
}