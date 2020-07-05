'use strict'

class ProjectsTab {

    #projectView;
    #projectsModel;

    constructor(tasksTab) {
        this.#projectView = new ProjectView();
        this.#projectsModel = new ProjectsModel();
    }

    getProjectView() {
        return this.#projectView;
    }

    getProjectsModel() {
        return this.#projectsModel
    }

    addProject(project) {
        this.#projectsModel.addProject(project);
        this.show();
    }

    addNewProject(name, creatorId, aimOfTheProject, arrayOfEmployeesId) {
        let id = this.#projectsModel.addProject(name, creatorId, aimOfTheProject, arrayOfEmployeesId);
        this.#projectView.addNewProject(id, name);
    }

    deleteProject(id) {
        this.#projectsModel.deleteProject(id);
        this.show();
    }

    getProject(id) {
        return this.#projectsModel.getProject(id);
    }

    addTaskToProject(projectId, task) {
        this.#projectsModel.addTaskToProject(projectId, task);
    }

    addEmployeeToProject(projectId, employeeId){
        this.#projectsModel.addEmployeeToProject(projectId, employeeId);

    }

    show() {
        this.#projectView.showProjectPage(this.#projectsModel);  
    }

    hide() {
        
    }

    getProjectInfo(employeesTab, projectId) {

        let aim = "";
        let project = this.getProject(Number(projectId) );

        if (project.getAimOfTheProject() != undefined &&
            project.getAimOfTheProject() != null &&
            project.getAimOfTheProject() != "") {
            aim = "<p>Цель проекта: " + project.getAimOfTheProject() + "</p>";
        }  

        let employeesInfo = "";

        employeesTab.getEmployeesFromArray(project.getArrayOfEmployeesId()).forEach(function(employee, index, array) {
            employeesInfo += employee.getSurnameAndName() + ", ";
        });

        employeesInfo = employeesInfo.substring(0, employeesInfo.length - 2);

        return aim + "<p>" + 
      //"Создатель проекта: " + employeesTab.getEmployee(this.#creatorId).getSurnameAndName() + "</p>" +
        "<p>" + "Над проектом работают: " + employeesInfo + "<p>";
        
    }
}