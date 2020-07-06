'use strict'

class TasksModel {

    async addTask(text, creatorId, projectId) {

        let response = await fetch('http://localhost:9000/task', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                Text: text,	
                EstimatedTime: 0,
                SpentTime: 0,
                Id: 0,
                Status: "Создано",
                Color: "",
                CreatorId: creatorId,
                AssignedToId: 0,
                ProjectId: projectId,
            })
        });

        return await response.json();
    }


    async getTask(id) {

        let response = await fetch(`http://localhost:9000/task/${id}`);

        let result = await response.json();

        if (result.Err == null) {

            let task = new Task( result.Data.Text,
                                 result.Data.CreatorId,
                                 result.Data.ProjectId,
                                 result.Data.Id,
                                 result.Data.EstimatedTime,
                                 result.Data.SpentTime,
                                 result.Data.Status,
                                 result.Data.Color,
                                 result.Data.AssignedToId);
            return task;
        } else {
            console.log(response.Err)
        }
    }


    async getTasksFromProject(projectId) {

        let response = await fetch(`http://localhost:9000/tasks/${projectId}`);
        let result = await response.json();

        if (result.Err == null) {

            let mapOfTasks = new Map();

            for (let tsk of result.Data) {

                let task = new Task(tsk.Text,
                                    tsk.CreatorId,
                                    tsk.ProjectId,
                                    tsk.Id,
                                    tsk.EstimatedTime,
                                    tsk.SpentTime,
                                    tsk.Status,
                                    tsk.Color,
                                    tsk.AssignedToId);

                mapOfTasks.set(tsk.Id, task);
            }

            return mapOfTasks;
        } else {
            console.log(response.Err)
        }
    }


    async updateTask(text, creatorId, projectId, id, estimatedTime, spentTime, status, color, assignedToId) {

        let response = await fetch('http://localhost:9000/updatetask', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                Text: text,	
                EstimatedTime: estimatedTime,
                SpentTime: spentTime,
                Id: +id,
                Status: status,
                Color: color,
                CreatorId: creatorId,
                AssignedToId: assignedToId,
                ProjectId: projectId,
            })
        });

        return await response.json();
    }

    async deleteTask(id) {

        let response = await fetch(`http://localhost:9000/task/${id}`, {
            method: 'DELETE',
        });

        return await response.json();

        ///

       /* let request = new XMLHttpRequest();

        request.open('DELETE', `http://localhost:9000/task/${id}`, false);
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
        }*/
    }
}