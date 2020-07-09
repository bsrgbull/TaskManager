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

        return await response.json();
    }

    async getEmployee(id) {
        
        let response = await fetch(`http://localhost:9000/employee/${id}`);

        let result = await response.json();
        
        if (result.Err == null) {


            let employee = new Employee( result.Data.id,
                                         result.Data.name,
                                         result.Data.surname,
                                         result.Data.password,
                                         result.Data.login,
                                         result.Data.email);
            return employee

        } else {
            console.log(response.Err)
        }
    }

    /*async getEmployeesFromArray(arrayOfEmployeesId) {

        let map = new Map();

        let requests = arrayOfEmployeesId.map(employeeId => this.getEmployee(employeeId));

        await Promise.all(requests)
                .then(responses => {
                    //все промисы успешно завершены
                    let i = 0;

                    for(let employeeId of arrayOfEmployeesId) {
                        map.set(employeeId, responses[i]);
                        i++;
                    }
        
                });
                
        return map;
    }*/

    async getMapOfEmployees() {

        let request = new XMLHttpRequest();

        await request.open('GET', `http://localhost:9000/employee`, false);
        await request.send();

        let mapOfEmployees = new Map();

        if (request.status != 200) {
            console.log( request.status + ': ' + request.statusText );
        } else {

            let response = JSON.parse(request.responseText);
            
            if (response.Err == null) {
                for (let emp of response.Data) {

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
            } else {
                console.log(response.Err)
            }
        }

        return mapOfEmployees;
    }

    updateEmployee(id, name, surname, password, login, email) {

        let request = new XMLHttpRequest();

        let json = JSON.stringify({
            name: name,
            surname: surname,
            login: login,
            email: email,
            password: password,
            id: +id,
        });

        request.open("POST", 'http://localhost:9000/updateemployee');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        // xhr.onreadystatechange = ...;

        // Отсылаем объект в формате JSON и с Content-Type application/json
        request.send(json);

        if (request.status != 200) {
            console.log( request.status + ': ' + request.statusText );
            return request.status;
        } else {
            let response = JSON.parse(request.responseText);

            if (response.Err == null) {
                return response.Data;
            } else {
                console.log(response.Err);
                return response.Err;
            }
        }
    }

    async deleteEmployee(id) {

        let response = await fetch(`http://localhost:9000/employee/${id}`, {
            method: 'DELETE',
        });

        return await response.json();
    }

    async getMapOfEmployeesFromProject(projectId) {

        let response = await fetch(`http://localhost:9000/employees/${+projectId}`);
        let result = await response.json();

        if (result.Err == null) {

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
            console.log(response.Err)
        }
    }

   /* login(login, password) {

        let result = false;

        if (login != "" && password != "" && login != undefined && password != undefined ) {

            this.#mapOfEmployees.forEach(function(employee, index, array) {

                if ((employee.getLogin() == login || employee.getEmail() == password)
                    && employee.getPassword() == password) {

                    alert((employee.getLogin() == login || employee.getEmail() == password)
                    && employee.getPassword() == password);

                    result = employee.getId();
                    return;
                }   
            });
        }
        return result;
    }*/


}

