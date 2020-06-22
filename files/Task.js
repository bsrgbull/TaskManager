'use strict'

class Task {

    #text;
    #startTime;
    #endTime;
    #id;
    #status;
    #creatorId;
    #assignedToId;
    static #nextId = 0;

    constructor(text, creatorId) {
        this.#text = text;
        this.#creatorId = creatorId;
        this.#id = "task" + Task.#nextId++;  //Проверить, работает ли счётчик
    }

    getText() {
        return this.#text;
    }

    setText(text) {
        this.#text = text;
    }

    getStartTime() {
        return this.#startTime;
    }

    getEndTime() {
        return this.#endTime;
    }

    setEndTime(time) {
        this.#endTime = time;
    }

    getId() {
        return this.#id;
    }

    getStatus() {
        return this.#status;
    }

    setStatus(status) {
        this.#status = status;
    }

    getCreatorId() {
        return this.#creatorId;
    }

    getAssignedToId() {
        return this.#assignedToId;
    }

    setAssignedToId(id) {
        this.#assignedToId = id;
    }
}