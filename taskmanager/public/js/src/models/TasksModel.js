'use strict'

class TasksModel {

    #mapOfTasks;
    static nextId = 0;

    static getNextId() {
        this.nextId++;
        return this.nextId;
    }

    constructor() {
        this.#mapOfTasks = new Map();

        this.addTask("Создание макета", "1", "1");
        this.addTask("Создание UML-диаграммы классов", "1", "1");
        this.addTask("Создание интерфейса при помощи Webix", "1", "1");
        this.addTask("Осуществление загрузки данных из объектов", "1", "1");
        this.addTask("Список сотрудников", "1", "1");
        this.addTask("Список проектов", "1", "1");
        this.addTask("Модальное окно для работы с сотрудниками", "1", "1");
        this.addTask("Поменять виджет с сотрудниками на DataTable", "1", "1");
        this.addTask("Логика добавления/удаления сотрудников", "1", "1");
        this.addTask("Логика добавления/удаления проектов", "1", "1");
        this.addTask("Добавление сотрудников в проект", "1", "1");
        this.addTask("Логика открывания проекта", "1", "1");
        this.addTask("Логика информации о проекте", "1", "1");
    }

    addTask(text, creatorId, projectId) {
        let id = TasksModel.getNextId();

        this.#mapOfTasks.set(id, new Task(text, creatorId, projectId, id));
        return id;
    }

    getMapOfTasks() {
        return this.#mapOfTasks;
    }

    getTask(id) {
        return this.#mapOfTasks.get(id);
    }

    updateTask(task) {
        if (task instanceof Task) {
            this.#mapOfTasks.set(task.getId(), task);
        } else alert("Ошибка: в TasksModel можно добавлять только объекты типа Project");
    }

    deleteTask(id) {
        this.#mapOfTasks.delete(id);
    }

    getMapOfTasks() {

        return this.#mapOfTasks;
    }

    getTasksFromProject(projectId) {
        let map = new Map();
        this.#mapOfTasks.forEach(function(task, index, array) {
            if (task.getProjectId = projectId) {
                map.set(task.getId(), task);
            }
        });
        return map;
    }

}