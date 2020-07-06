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

    updateProject(id, name, mapOfEmployees, creatorId, aimOfTheProject) {

        let request = new XMLHttpRequest();

        let json = JSON.stringify({
            name: name,
            creatorId: +creatorId,
            aimOfTheProject: aimOfTheProject,
            arrayOfEmployeesId: arrayOfEmployeesId,
            id: +id,
        });

        request.open("POST", 'http://localhost:9000/updateproject');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        // xhr.onreadystatechange = ...;

        // Отсылаем объект в формате JSON и с Content-Type application/json
        request.send(json);

        if (request.status != 200) {
            console.log( request.status + ': ' + request.statusText );
            return request.status;
        } else {
            let response = JSON.parse(request.responseText);

            if (response.Err == null) {
                return response.Data;
            } else {
                console.log(response.Err);
                return response.Err;
            }
        }
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
        console.log("addEmployee");
        this.#mapOfProjects.get(Number(projectId) ).addEmployee(Number(employeeId) );
    }

    deleteEmployeeFromProject(projectId, employeeId) {

    }

    getProjectInfo(projectId){
        return this.getProject(+projectId).getProjectInfo();

    }
}