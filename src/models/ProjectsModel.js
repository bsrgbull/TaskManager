'use strict'

class ProjectsModel {

    #mapOfProjects;

    constructor() {
        this.#mapOfProjects = new Map();

        let project1 = new Project("Создание TaskManager", "employee1");
        let project2 = new Project("HTTP-сервер", "employee1");
        let project3 = new Project("CDMA-шифрование", "employee1");
        let project4 = new Project("Редактор видео", "employee1");

        project1.addTask(new Task("Создание макета", "employee1"));
        project1.addTask(new Task("Создание UML-диаграммы классов", "employee1"));
        project1.addTask(new Task("Создание интерфейса при помощи Webix", "employee1"));
        project1.addTask(new Task("Осуществление загрузки данных из объектов", "employee1"));
        project1.addTask(new Task("Список сотрудников", "employee1"));
        project1.addTask(new Task("Список проектов", "employee1"));
        project1.addTask(new Task("Модальное окно для работы с сотрудниками", "employee1"));
        project1.addTask(new Task("Поменять виджет с сотрудниками на DataTable", "employee1"));
        project1.addTask(new Task("Логика добавления/удаления сотрудников", "employee1"));
        project1.addTask(new Task("Логика добавления/удаления проектов", "employee1"));
        project1.addTask(new Task("Добавление сотрудников в проект", "employee1"));
        project1.addTask(new Task("Логика открывания проекта", "employee1"));
        project1.addTask(new Task("Логика информации о проекте", "employee1"));

        project1.setAimOfTheProject("Разработать Task Manager - программу для управления проектами небольших групп людей. Это инструмент, который позволяет разработчикам вести учет задач проекта, планировать и отслеживать процесс выполнения. Требования: учёт проектов; учёт задач; учёт сотрудников; логика состояний для задач. Под учётом подразумеваются CRUD операции. Технологии, которые необходимо использовать: для фронтэнда - Webix, для бэкэнда: Revel");

        this.addProject(project4);
        this.addProject(project3);
        this.addProject(project2);
        this.addProject(project1);
    }

    /* getAllProjects() {
        return this.#mapOfProjects.get(id);
    }*/

    getMapOfProjects() {
        return this.#mapOfProjects;
    }

    getProject(id) {
        return this.#mapOfProjects.get(id);
    }

    addProject(project) {
        if (project instanceof Project) {
            this.#mapOfProjects.set(project.getId(), project);
        } else alert("Ошибка: в ProjectModel можно добавлять только объекты типа Project");
    }

    deleteProject(id) {
        this.#mapOfProjects.delete(id);
    }

    addEmployeeToProject(projectId, employeeId) {
        
    }

    deleteEmployeeFromProject(projectId, employeeId) {

    }
}