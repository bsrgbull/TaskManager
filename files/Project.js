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
        return this.#aimOfTheProject + "\n\nПроект создан: " + "сотрудник по id" + "\n\n" +
        "Над проектом работают: " + this.getEmployeesInfo();
    }

    getEmployeesInfo() {
        return "";
    }

    getTask(id) {
        return this.#mapOfTasks.get(id);
    }

   /* getCopyOfMapOfTasks() {
        let map = this.#mapOfTasks;
        return map.slice(); //Возвращаем копию массива
    }*/

    getMap() {
        return this.#mapOfTasks;
    }

    getLengthOfMap() {
        return this.#mapOfTasks.length;
    }
    
    addTask(task) {

        if (task instanceof Task) {
            this.#mapOfTasks.set(task.getId(), task);
        } else alert("Ошибка: в проект можно добавлять только объекты типа Task");
    }

    deleteTask(id) {
        this.#mapOfTasks.delete(id);
    }

    getName() {
        return this.#name;
    }

    setName(name) {
        this.#name = name;
    }

    getEmployee() {
        return this.#mapOfEmployees.get(id);
    }

    addEmployee(employee) {
        if (employee instanceof Employee) {
            this.#mapOfTasks.set(employee.getId(), employee);
        } else alert("Ошибка: необходим объект типа Employee");
    }

    deleteEmployee(id) {
        this.#mapOfEmployees.delete(id);
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
}