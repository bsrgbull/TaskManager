'use strict'

class Project {

    #id;
    #name;
    #creatorId;
    #aimOfTheProject
    #arrayOfEmployeesId;


    constructor(id, name, creatorId, aimOfTheProject, arrayOfEmployeesId) {

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

    getArrayOfEmployeesId() {
        return this.#arrayOfEmployeesId;
    }

    getName() {
        return this.#name;
    }

    setName(name) {
        this.#name = name;
    }

    addEmployee(employeeId) {
        if (!this.#arrayOfEmployeesId.includes(employeeId)) {
            this.#arrayOfEmployeesId.push(Number(employeeId));
        }
    }

    deleteEmployee(id) {
        let index = this.#arrayOfEmployeesId.indexOf(Number(id));

        if (index != -1) {
            this.#arrayOfEmployeesId.splice(index, 1);
        }
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