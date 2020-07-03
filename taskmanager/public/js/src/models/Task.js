'use strict'

class Task {

    #text;
    #estimatedTime;
    #spentTime;
    #id;
    #status;
    #color
    #creatorId;
    #assignedToId;
    #projectId;


    constructor(text, creatorId, projectId, id) {
        this.#text = text;
        this.#creatorId = creatorId;
        this.#status = "Создано";
        this.#estimatedTime = 0;
        this.#spentTime = 0;
        this.#projectId = projectId;
        this.#id = id;
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
        this.#assignedToId = Number(id);
    }

    deleteAssignedToId() {
        this.#assignedToId = null;
    }

    setColor(color) {
        this.#color = color
    }

    getColor() {
        return this.#color
    }

    setProjectId(projectId) {
        this.#projectId = projectId;
    }

    getProjectId() {
        return this.#projectId;
    }
}