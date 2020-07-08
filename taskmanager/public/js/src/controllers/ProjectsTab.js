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

    async addNewProject(name, creatorId, aimOfTheProject, arrayOfEmployeesId) {

        let result = await this.#projectsModel.addProject(name, creatorId, aimOfTheProject, arrayOfEmployeesId);
          
        let id;

        if (result.Err == null) {
            id = result.Data;
        } else {
            console.log(result.Err);
            return result.Err;
        }

        this.#projectView.addNewProject(id, name);
    }

    deleteProject(id) {
        this.#projectsModel.deleteProject(id);
        this.show();
    }

    async getProject(id) {
        return await this.#projectsModel.getProject(id);
    }

    updateProject(id, name, arrayOfEmployeesId, creatorId, aimOfTheProject) {
        this.#projectsModel.updateProject(id, name, arrayOfEmployeesId, creatorId, aimOfTheProject);
        this.#projectView.updateProject(id, name, arrayOfEmployeesId, creatorId, aimOfTheProject);
    }

    addTaskToProject(projectId, task) {
        this.#projectsModel.addTaskToProject(projectId, task);
    }

    addEmployeeToProject(projectId, employeeId){
        this.#projectsModel.addEmployeeToProject(projectId, employeeId);
    }

    deleteEmployeeFromProject(projectId, employeeId) {
        this.#projectsModel.deleteEmployeeFromProject(projectId, employeeId);
    }

    show() {
        this.#projectView.showProjectPage(this.#projectsModel);  
    }

    async getProjectInfo(employeesTab, projectId) {

        let aim = "";

        let project = await this.getProject(Number(projectId) );

        if (project.getAimOfTheProject() != undefined &&
            project.getAimOfTheProject() != null &&
            project.getAimOfTheProject() != "") {
            aim = "<p>Цель проекта: " + project.getAimOfTheProject() + "</p>";
        }  
       
        let employeesInfo = "";

        await employeesTab.getEmployeesFromArray(project.getArrayOfEmployeesId())
                .then( mapOfEmployees => {
                    mapOfEmployees.forEach(function(employee, index, array) {
                        employeesInfo += employee.getSurnameAndName() + ", ";
                    });
                });
        
        employeesInfo = employeesInfo.substring(0, employeesInfo.length - 2);

        return aim + "<p>" + 
      //"Создатель проекта: " + employeesTab.getEmployee(this.#creatorId).getSurnameAndName() + "</p>" +
        "<p>" + "Над проектом работают: " + employeesInfo + "<p>";
        
    }

    getArrayOfEmployeesFromProject(projectId) {
        return this.#projectsModel.getArrayOfEmployeesFromProject(projectId);
    }
}