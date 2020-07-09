'use strict'

class Project {

    #id;
    #name;
    #creatorId;
    #aimOfTheProject


    constructor(id, name, creatorId, aimOfTheProject) {

        this.#id = id;
        this.#name = name;
        this.#creatorId = creatorId;
        this.#aimOfTheProject = aimOfTheProject;
    }

    getProjectInfo() {


    }

    getName() {
        return this.#name;
    }

    setName(name) {
        this.#name = name;
    }

    getAimOfTheProject() {
        return this.#aimOfTheProject;
    }

    setAimOfTheProject(aim) {
        this.#aimOfTheProject = aim;
    }

    getId() {
        return this.#id;
    }

    getCreatorId() {
        return this.#creatorId;
    }
}