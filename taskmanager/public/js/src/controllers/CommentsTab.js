'use strict'

class CommentsTab {

    #commentsModel;

    constructor() {
        this.#commentsModel = new CommentsModel();
    }

    addNewComment(authorid, taskid, text) {

        this.#commentsModel.addComment(authorid, taskid, text)
            .then( result => {
                if (result != "error") {
                    if (result.Err != null){
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

    getCommentsModel() {
        return this.#commentsModel
    }

    async getComment(id) {
        return await this.#commentsModel.getComment(id);
    }

    getMapOfCommentsFromProject(projectId) {
        return this.#commentsModel.getMapOfCommentsFromProject(projectId);
    }

}