'use strict'

class ProjectsModel {

    #mapOfProjects;

    async addProject(name, creatorId, aimOfTheProject, arrayOfEmployeesId) {

        let response = await fetch('http://localhost:9000/project', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                name: name,
                creatorId: +creatorId,
                aimOfTheProject: aimOfTheProject,
                arrayOfEmployeesId: arrayOfEmployeesId,
            })
        });

        return await response.json();
    }

    async getProject(id) {

        let response = await fetch(`http://localhost:9000/project/${id}`);

        let result = await response.json();

        if (result.Err == null) {

            let project = new Project( result.Data.id,
                                       result.Data.name,
                                       result.Data.creatorId,
                                       result.Data.aimOfTheProject,
                                       result.Data.ArrayOfEmployeesId);
            return project;
        } else {
            console.log(response.Err)
        }
    }

    getMapOfProjects() {

        let request = new XMLHttpRequest();

        request.open('GET', `http://localhost:9000/project`, false);
        request.send();

        let mapOfProjects = new Map();

        if (request.status != 200) {
            console.log( request.status + ': ' + request.statusText );
        } else {

            let response = JSON.parse(request.responseText);
            
            if (response.Err == null) {
                for (let proj of response.Data) {

                    let project = new Project( proj.id,
                                               proj.name,
                                               proj.creatorId,
                                               proj.aimOfTheProject,
                                               proj.ArrayOfEmployeesId);

                    mapOfProjects.set(proj.id, project)
                }
            } else {
                console.log(response.Err)
            }
        }

        return mapOfProjects;
    }

    async updateProject(id, name, arrayOfEmployeesId, creatorId, aimOfTheProject) {


        let response = await fetch('http://localhost:9000/updateproject', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                Name: name,
                CreatorId: +creatorId,
                AimOfTheProject: aimOfTheProject,
                ArrayOfEmployeesId: arrayOfEmployeesId,
                Id: +id,
            })
        });

        return await response.json();
    }

    deleteProject(id) {

        let request = new XMLHttpRequest();

        request.open('DELETE', `http://localhost:9000/project/${id}`, false);
        request.send();
        
        if (request.status != 200) {
            console.log( request.status + ': ' + request.statusText );
            return request.status
        } else {

            let response = JSON.parse(request.responseText);

            if (response.Err != null) {
                console.log(response.Err)
                return response.Err
            }
            return null
        }
    }

    addEmployeeToProject(projectId, employeeId) {

        this.getProject(projectId).then(project => {
            let arrayOfEmployeesId = project.getArrayOfEmployeesId();
            arrayOfEmployeesId.push(+employeeId);

            this.updateProject( +projectId, 
                                project.getName(),
                                arrayOfEmployeesId,
                                +project.getCreatorId(),
                                project.getAimOfTheProject() );
        });

    }

    deleteEmployeeFromProject(projectId, employeeId) {

        this.getProject(projectId).then(project => {

            let arrayOfEmployeesId = project.getArrayOfEmployeesId();

            let index = arrayOfEmployeesId.indexOf(+employeeId);

            if (index != -1) {
                arrayOfEmployeesId.splice(index, 1);
            }

            this.updateProject( +projectId, 
                                project.getName(),
                                arrayOfEmployeesId,
                                +project.getCreatorId(),
                                project.getAimOfTheProject() );
        });
    }

    getProjectInfo(projectId){
        return this.getProject(+projectId).getProjectInfo();

    }
}