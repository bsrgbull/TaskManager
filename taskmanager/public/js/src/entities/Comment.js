'use strict'

class Comment {

    #id;
    #authorid;
    #taskid;
    #text;

    constructor(id, authorid, taskid, text) {
        this.#id = id;
        this.#authorid = authorid;
        this.#taskid = taskid;
        this.#text = text;
    }

    getId() {
        return this.#id;
    }

    getAuthorId() {
        return this.#authorid;
    }


    getTaskId() {
        return this.#taskid;
    }

    getText() {
        return this.#text;
    }

    setText(text) {
        this.#text = text;
    }
}