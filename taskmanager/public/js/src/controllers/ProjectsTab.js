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

    async addNewProject(name, creatorId, aimOfTheProject) {
                  
        let id;

        this.#projectsModel.addProject(name, creatorId, aimOfTheProject)
            .then( result => {
                if (result != "error") {
                    if (result.Err == null) {
                        this.#projectView.addNewProject(result.Data, name);
                    } else {
                        webix.message("ОШИБКА")
                        console.log(result);
                    }
                } else {
                    webix.message("Операция не удалась");
                }
            },
            error => {
                webix.message("Операция не удалась");
            }
        );
    }

    deleteProject(id) {
        return this.#projectsModel.deleteProject(id)
                    .then( result => {
                            if ( result != "error" ) {
                                if (result.Err == null) {
                                    this.show();
                                } else {
                                    return result.Err;
                                }
                            } else {
                                return "error"
                            }
                        },
                        error => { return "error" }
                    );
    }

    async getProject(id) {
        return await this.#projectsModel.getProject(id);
    }

    updateProject(id, name, creatorId, aimOfTheProject) {

        this.#projectsModel.updateProject(id, name, creatorId, aimOfTheProject)
            .then( result => {
                    if (result != "error") {
                        if (result.Err == null) {
                            this.#projectView.updateProject(id, name, creatorId, aimOfTheProject);
                        } else {
                            webix.message("ОШИБКА")
                            console.log(result);
                        }
                    } else {
                        webix.message("Операция не удалась");
                    }
                },
                error => {
                    webix.message("Операция не удалась");
                }
            );
    }

    addEmployeeToProject(projectId, employeeId){
        return this.#projectsModel.addEmployeeToProject(+projectId, +employeeId);
    }

    deleteEmployeeFromProject(projectId, employeeId) {
        return this.#projectsModel.deleteEmployeeFromProject(+projectId, +employeeId);
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
        let creatorInfo = "";

        await employeesTab.getMapOfEmployeesFromProject(projectId)
                .then( mapOfEmployees => {
                    mapOfEmployees.forEach(function(employee, index, array) {
                        employeesInfo += employee.getSurnameAndName() + ", ";
                    });
                });
        
        employeesInfo = employeesInfo.substring(0, employeesInfo.length - 2);

        await projectsTab.getProject(projectId)
                .then(async function(project) { 
                        await employeesTab.getEmployee(project.getCreatorId() )
                        .then( employee =>
                            {
                                creatorInfo = employee.getSurnameAndName();
                        });
                });

        return aim + "<p>" + 
        "Создатель проекта: " + creatorInfo + "</p>" +
        "<p>" + "Над проектом работают: " + employeesInfo + "<p>";
        
    }
}