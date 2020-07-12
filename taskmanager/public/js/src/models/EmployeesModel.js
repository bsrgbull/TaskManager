'use strict'

class EmployeesModel {

    async addEmployee(name, surname, password, login, email) {

        let response = await fetch('http://localhost:9000/employee', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                name: name,
                surname: surname,
                login: login,
                email: email,
                password: password,
            })
        });

        if (response.status == 200) {
            return await response.json();
        } else {
            return "error"
        }
    }

    async getEmployee(id) {
        
        let response = await fetch(`http://localhost:9000/employee/${id}`);

        let result = await response.json();

        if (response.status != 200) {
            webix.message("Не удалось загрузить Сотрудника");
        } else if (result.Err == null) {

            let employee = new Employee( result.Data.id,
                                         result.Data.name,
                                         result.Data.surname,
                                         result.Data.password,
                                         result.Data.login,
                                         result.Data.email);
            return employee

        } else {
            webix.message(result.Severity + " Код:" + result.Code + " " + 
                                result.Message + " " + result.Detail);
        }
    }

    async getMapOfEmployees() {

        let response = await fetch(`http://localhost:9000/employee`);
        let result = await response.json();

        if (response.status != 200) {
            webix.message("Не удалось загрузить Сотрудников");
        } else if (result.Err == null) {

            let mapOfEmployees = new Map();

            for (let emp of result.Data) {

                let employee = new Employee( emp.id,
                                             emp.name,
                                             emp.surname,
                                             emp.password,
                                             emp.login,
                                             emp.email);
                if (emp.id != 0)  {   // зарезервировал id = 0 за нулевым значением employee (в Go int не может быть nil)
                    mapOfEmployees.set(emp.id, employee)
                }
            }

            return mapOfEmployees;
        } else {
            webix.message(result.Severity + " Код:" + result.Code + " " + 
                            result.Message + " " + result.Detail);
        }
    }

    async updateEmployee(id, name, surname, password, login, email) {

        let response = await fetch('http://localhost:9000/updateemployee', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                name: name,
                surname: surname,
                login: login,
                email: email,
                password: password,
                id: +id,
            })
        });
        
        if (response.status == 200) {
            return await response.json();
        } else {
            return "error"
        }
    }

    async deleteEmployee(id) {

        let response = await fetch(`http://localhost:9000/employee/${id}`, {
            method: 'DELETE',
        });

        if (response.status == 200) {
            return await response.json();
        } else {
            return "error"
        }
    }

    async getMapOfEmployeesFromProject(projectId) {

        let response = await fetch(`http://localhost:9000/employees/${+projectId}`);
        let result = await response.json();

        if (response.status != 200) {
            webix.message("Не удалось загрузить Сотрудников");
        } else if (result.Err == null) {

            let mapOfEmployees = new Map();

            for (let emp of result.Data) {

                let employee = new Employee(emp.id,
                                            emp.name,
                                            emp.surname,
                                            emp.password,
                                            emp.login,
                                            emp.email);

                if (emp.id != 0)  {   // зарезервировал id = 100 за нулевым значением employee (в Go int не может быть nil)
                    mapOfEmployees.set(emp.id, employee)
                }                                            
            }

            return mapOfEmployees;
        } else {
            webix.message(result.Severity + " Код:" + result.Code + " " + 
                            result.Message + " " + result.Detail);
        }
    }

    async login(login, password) {

        let response = await fetch(`http://localhost:9000/login/` + 
        `?login=${login}&password=${password}`, {
            method: 'POST',
        });

        if (response.status == 200) {
            return await response.json();
        } else {
            return "error"
        }
    }

}

