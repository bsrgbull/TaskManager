'use strict'

class TasksModel {

    #mapOfTasks //Эта карта нужна для корректной, и быстрой работы Drag&Drop

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
                Colour: "",
                CreatorId: creatorId,
                AssignedToId: 0,  //зарезервировано за значением null, в Go int не может быть nil
                ProjectId: projectId,
            })
        });

        if (response.status == 200) {
            return await response.json();
        } else {
            return "error"
        }
    }


    async getTask(id) {

        let response = await fetch(`http://localhost:9000/task/${+id}`);

        let result = await response.json();

        if (result.Err == null) {

            let task = new Task( result.Data.Text,
                                 result.Data.CreatorId,
                                 result.Data.ProjectId,
                                 result.Data.Id,
                                 result.Data.EstimatedTime,
                                 result.Data.SpentTime,
                                 result.Data.Status,
                                 result.Data.Colour,
                                 result.Data.AssignedToId);
            return task;
        } else {
            webix.message("ОШИБКА");
            console.log(result);
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
                                    tsk.Colour,
                                    tsk.AssignedToId);

                mapOfTasks.set(tsk.Id, task);
            }

            this.#mapOfTasks = mapOfTasks;

            return mapOfTasks;
        } else {
            console.log("ОШИБКА")
            webix.message(result);
        }
    }


    async updateTask(text, creatorId, projectId, id, estimatedTime, spentTime, status, colour, assignedToId) {

        let response = await fetch('http://localhost:9000/updatetask', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                Text: text,	
                EstimatedTime: +estimatedTime,
                SpentTime: +spentTime,
                Id: +id,
                Status: status,
                Colour: colour,
                CreatorId: +creatorId,
                AssignedToId: +assignedToId,
                ProjectId: +projectId,
            })
        });

        return await response.json();
    }

    async deleteTask(id) {

        let response = await fetch(`http://localhost:9000/task/${id}`, {
            method: 'DELETE',
        });
    }

    setMapOfTasks(mapOfTasks) {
        this.#mapOfTasks = mapOfTasks;
    }

    getMapOfTasks() {
        return this.#mapOfTasks;
    }
}