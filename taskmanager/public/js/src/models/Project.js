'use strict'

class Project {

    #mapOfTasks;
    #id;
    #name;
    #mapOfEmployees;
    #creatorId;
    #aimOfTheProject
    static nextId = 0;

    static getNextId() {
        this.nextId++;
        return this.nextId;
    }

    constructor(name, creatorId) {
        this.#mapOfTasks = new Map();
        this.#mapOfEmployees = new Map();
        this.#name = name;
        this.#creatorId = creatorId;
        this.#id = "project" + Project.getNextId();
    }

    getProjectInfo() {

        let aim = "";

        if (this.#aimOfTheProject != undefined && this.#aimOfTheProject != null) {
            aim = "<p>Цель проекта: " + this.#aimOfTheProject + "</p>";
        }  

        return aim + "<p>" + 
      //"Создатель проекта: " + employeesTab.getEmployee(this.#creatorId).getSurnameAndName() + "</p>" +
        "<p>" + "Над проектом работают: " + this.getEmployeesInfo() + "<p>";
    }

    getEmployeesInfo() {

        let employeesInfo = "";

        this.#mapOfEmployees.forEach((value, key, map) => {
            employeesInfo += value.getSurnameAndName() + ", ";
        });;

        employeesInfo = employeesInfo.substring(0, employeesInfo.length - 2);
        return employeesInfo;
    }

    getTask(id) {
        return this.#mapOfTasks.get(String(id));
    }

    getMap() {
        return this.#mapOfTasks;
    }

    getMapOfEmployees() {
        return this.#mapOfEmployees;
    }

    getLengthOfMap() {
        return this.#mapOfTasks.length;
    }
    
    addTask(task) {

        if (task instanceof Task) {
            this.#mapOfTasks.set(String(task.getId()), task);
        } else alert("Ошибка: в проект можно добавлять только объекты типа Task");
    }

    deleteTask(id) {
        this.#mapOfTasks.delete(String(id));
    }

    getName() {
        return this.#name;
    }

    setName(name) {
        this.#name = name;
    }

    getEmployee(id) {
        return this.#mapOfEmployees.get(String(id));
    }

    addEmployee(employee) {
        if (employee instanceof Employee) {
            this.#mapOfEmployees.set(String(employee.getId()), employee);
        } else alert("Ошибка: необходим объект типа Employee");
    }

    deleteEmployee(id) {
        this.#mapOfEmployees.delete(String(id));
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