'use strict'

class Project {

    #id;
    #name;
    #arrayOfEmployeesId;
    #creatorId;
    #aimOfTheProject


    constructor(name, creatorId, id, arrayOfEmployeesId, aimOfTheProject) {

        this.#id = id;
        this.#name = name;
        this.#creatorId = creatorId;
        this.#aimOfTheProject = aimOfTheProject;

        if (arrayOfEmployeesId == undefined) {
            this.#arrayOfEmployeesId = [];
        } else {
            this.#arrayOfEmployeesId = arrayOfEmployeesId;
        }

    }

    getProjectInfo() {


    }

    getArrayOfEmployeesIds() {
        return this.#arrayOfEmployeesId;
    }

    getName() {
        return this.#name;
    }

    setName(name) {
        this.#name = name;
    }

    addEmployee(employeeId) {
        this.#arrayOfEmployeesId.push(employeeId);
    }

    deleteEmployee(id) {
        this.#arrayOfEmployeesId.shift(id);
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