'use strict'

class ProjectTab {

    #projectView;
    #projectModel;

    constructor() {
        this.#projectView = new ProjectView();
        this.#projectModel = new ProjectModel();
    }

    getProjectView() {
        return this.#projectView;
    }

    getProjectModel() {
        return this.#projectModel
    }

    show() {

    }

    hide() {
        
    }
}