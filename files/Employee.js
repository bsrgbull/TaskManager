'use strict'

class Employee {

    #name;
    #surname;
    #login;
    #email;
    #password;
    #id;
    static #nextId;

    constructor(name, surname, password) {
        this.#name = name;
        this.#surname = surname;
        this.#password = password;
        this.#id = "employee" + Employee.#nextId++;  //Проверить, работает ли счётчик
    }

    getSurnameAndName() {
        return this.#surname + this.#name;
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
        return this.#login;
    }

    setLogin(login) {
        this.#login = login;
    }

    getEmail() {
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