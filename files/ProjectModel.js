'use strict'

class ProjectModel {

    #mapOfProjects;

    constructor() {
        this.#mapOfProjects = new Map();
    }

    getAllProjects() {
        return this.#mapOfProjects.get(id);
    }

    getProject(Id) {
        return this.#mapOfProjects.get(id);
    }

    addProject(project) {
        if (project instanceof Project) {
            this.#mapOfProjects.set(project.getId(), project);
        } else alert("Ошибка: в ProjectModel можно добавлять только объекты типа Project");
    }

    deleteProject(Id) {
        this.#mapOfProjects.delete(id);
    }
}