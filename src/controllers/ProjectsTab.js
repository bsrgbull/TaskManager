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

    show() {
        this.#projectView.showProjectPage(this.#projectsModel);  
    }

    hide() {
        
    }
}