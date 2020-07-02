'use strict'

class Employee {

    #id;
    #name;
    #surname;
    #login;
    #email;
    #password;


    constructor(id, name, surname, password, login, email) {
        this.#id = id;
        this.#name = name;
        this.#surname = surname;
        this.#login = login;
        this.#email = email;
        this.#password = password;
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