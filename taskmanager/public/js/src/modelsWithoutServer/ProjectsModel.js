'use strict'

class ProjectsModel {

    #mapOfProjects;
    static nextId = 0;

    static getNextId() {
        this.nextId++;
        return this.nextId;
    }

    constructor() {
        this.#mapOfProjects = new Map();

        this.addProject("Создание TaskManager", 1);  
        this.addProject("HTTP-сервер", 1);
        this.addProject("Редактор видео", 1);
        this.addProject("CDMA-шифрование", 1);
        

        this.getProject(1).getArrayOfEmployeesId().push(1,2,3,4);
        this.getProject(2).getArrayOfEmployeesId().push(1,5,6,7,8);
        this.getProject(3).getArrayOfEmployeesId().push(1,9,10);
        this.getProject(4).getArrayOfEmployeesId().push(1);
        this.getProject(1).setAimOfTheProject("Разработать Task Manager - программу для управления проектами небольших групп людей. Это инструмент, который позволяет разработчикам вести учет задач проекта, планировать и отслеживать процесс выполнения. Требования: учёт проектов; учёт задач; учёт сотрудников; логика состояний для задач. Под учётом подразумеваются CRUD операции. Технологии, которые необходимо использовать: для фронтэнда - Webix, для бэкэнда: Revel");
        
    }

    addProject(name, creatorId, aimOfTheProject, arrayOfEmployeesId) {

        let id = ProjectsModel.getNextId();
        
        this.#mapOfProjects.set(id, new Project(id, name, creatorId, aimOfTheProject, arrayOfEmployeesId));

        return id;
    }

    getMapOfProjects() {
        return this.#mapOfProjects;
    }

    getProject(id) {
        return this.#mapOfProjects.get(Number(id));
    }

    updateProject(id, name, mapOfEmployees, creatorId, aimOfTheProject) {
        this.#mapOfProjects.set(id, new Project(id, name,
             mapOfEmployees, creatorId, aimOfTheProject));
    }

    deleteProject(id) {
        this.#mapOfProjects.delete(Number(id));
    }

    addEmployeeToProject(projectId, employeeId) {
        console.log("addEmployee");
        this.#mapOfProjects.get(Number(projectId) ).addEmployee(Number(employeeId) );
    }

    deleteEmployeeFromProject(projectId, employeeId) {

    }

    getProjectInfo(projectId){
        this.#mapOfProjects.get(Number(projectId) ).getProjectInfo();
    }
}