'use strict'

class Employee {

    #name;
    #surname;
    #login;
    #email;
    #password;
    #id;
    static nextId = 0;

    static getNextId() {
        this.nextId++;
        return this.nextId;
    }

    constructor(name, surname, password) {
        this.#name = name;
        this.#surname = surname;
        this.#password = password;
        this.#id = "employee" + Employee.getNextId();
    }

    getSurnameAndName() {
        return this.#surname + " " + this.#name;
    }

    getName() {
        return this.#name;
    }

    setName(name) {
        this.#name = name;
    }

    getSurname() {
        return this.#surname;
    }

    setSurname(surname) {
        this.#surname = surname;
    }

    getLogin() {
        if (this.#login == undefined || this.#login == null) {
            return "";
        }
        return this.#login;
    }

    setLogin(login) {
        this.#login = login;
    }

    getEmail() {
        if (this.#email == undefined || this.#email == null) {
            return "";
        }
        return this.#email;
    }

    setEmail(email) {
        this.#email = email;
    }

    getPassword() {
        return this.#password;
    }

    setName(password) {
        this.#password = password;
    }

    getId() {
        return this.#id;
    }
}