'use strict'

class CommentsModel {

    async addComment(authorid, taskid, text) {

        let response = await fetch('/comment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                authorid: authorid,
                taskid: taskid,
                text: text,
            })
        });

        if (response.status == 200) {
            return await response.json();
        } else {
            return "error"
        }
    }

    async getComment(id) {
        
        let response = await fetch(`/comment/${id}`);

        let result = await response.json();

        if (response.status != 200) {
            webix.message("Не удалось загрузить Комментарий");
        } else if (result.Err == null) {

            let comment = new Comment(  result.Data.id,
                                        result.Data.authorid,
                                        result.Data.taskid,
                                        result.Data.text);
            return comment

        } else {
            webix.message("ОШИБКА");
            console.log(result);
        }
    }

    async getMapOfCommentsFromProject(projectId) {

        let response = await fetch(`/comments/${+projectId}`);
        let result = await response.json();

        if (response.status != 200) {
            webix.message("Не удалось загрузить Комментарии");
        } else if (result.Err == null) {

            let mapOfComments = new Map();

            for (let com of result.Data) {

                let comment = new Comment(  com.id,
                                            com.authorid,
                                            com.taskid,
                                            com.text);

                mapOfComments.set(com.id, comment)                         
            }

            return mapOfComments;
        } else {
            webix.message("ОШИБКА");
            console.log(result);
        }
    }

}

