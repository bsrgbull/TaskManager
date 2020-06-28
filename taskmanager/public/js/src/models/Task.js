'use strict'

class Task {

    #text;
    #estimatedTime;
    #startTime;
    #spentTime;
    #id;
    #status;
    #creatorId;
    #assignedToId;
    static nextId = 0;

    static getNextId() {
        this.nextId++;
        return this.nextId;
    }

    constructor(text, creatorId) {
        this.#text = text;
        this.#creatorId = creatorId;
        this.#id = "task" + Task.getNextId();
        this.#status = "Создано";
//        this.setEstimatedTime("1");
    }

    getText() {
        return this.#text;
    }

    setText(text) {
        this.#text = String(text);
    }

    getEstimatedTime() {
        return this.#estimatedTime;
    }

    setEstimatedTime(time) {
        this.#estimatedTime = String(time);
    }

    getStartTime() {
        return this.#startTime;
    }

    setStartTime(time) {
        this.#startTime = String(time);
    }

    getSpentTime(time) {
        return this.#spentTime;
    }

    setSpentTime(time) {
        this.#spentTime = String(time);
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

    deleteAssignedToId() {
        this.#assignedToId = null;
    }
}