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
        this.#projectView.addProject(project);
    }

    deleteProject(id) {
        this.#projectsModel.deleteProject(id);
        this.#projectView.deleteProject(id);
    }

    getProject(id) {
        return this.#projectsModel.getProject(id);
    }

    show() {

    }

    hide() {
        
    }
}