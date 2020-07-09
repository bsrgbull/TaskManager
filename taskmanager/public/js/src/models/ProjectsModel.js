'use strict'

class ProjectsModel {

    #mapOfProjects;

    async addProject(name, creatorId, aimOfTheProject) {

        let response = await fetch('http://localhost:9000/project', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                name: name,
                creatorId: +creatorId,
                aimOfTheProject: aimOfTheProject,
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
                                       result.Data.aimOfTheProject);
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
                                               proj.aimOfTheProject);

                    mapOfProjects.set(proj.id, project)
                }
            } else {
                console.log(response.Err)
            }
        }

        return mapOfProjects;
    }

    async updateProject(id, name, creatorId, aimOfTheProject) {

        let response = await fetch('http://localhost:9000/updateproject', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                Name: name,
                CreatorId: +creatorId,
                AimOfTheProject: aimOfTheProject,
                Id: +id,
            })
        });

        return await response.json();
    }

    async deleteProject(id) {

        let response = await fetch(`http://localhost:9000/project/${id}`, {
            method: 'DELETE',
        });

        return await response.json();
    }

    async addEmployeeToProject(projectId, employeeId) {

        let response = await fetch(`http://localhost:9000/projectemp/` + 
        `?employeeId=${employeeId}&projectId=${projectId}`, {
            method: 'POST',
        });

        return await response.json();

    }

    async deleteEmployeeFromProject(projectId, employeeId) {

        let response = await fetch(`http://localhost:9000/projectemp/` + 
        `?employeeId=${employeeId}&projectId=${projectId}`, {
            method: 'DELETE',
        });

        return await response.json();
    }

    getProjectInfo(projectId){
        return this.getProject(+projectId).getProjectInfo();

    }

}