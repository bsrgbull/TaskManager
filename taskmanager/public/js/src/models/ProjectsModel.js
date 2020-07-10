'use strict'

class ProjectsModel {

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
        if (response.status == 200) {
            return await response.json();
        } else {
            return "error"
        }
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

    async getMapOfProjects() {

        let response = await fetch(`http://localhost:9000/project`);
        let result = await response.json();

        if (result.Err == null) {

            let mapOfProjects = new Map();

            for (let proj of result.Data) {

                let project = new Project( proj.id,
                                           proj.name,
                                           proj.creatorId,
                                           proj.aimOfTheProject);

                mapOfProjects.set(proj.id, project)
            }

            return mapOfProjects;
        } else {
            webix.message(result.Severity + " Код:" + result.Code + " " + 
                            result.Message + " " + result.Detail);
        }
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

}