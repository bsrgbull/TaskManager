'use strict'

class EmployeesModel {

    addEmployee(name, surname, password, login, email) {

        let request = new XMLHttpRequest();

        let json = JSON.stringify({
            name: name,
            surname: surname,
            login: login,
            email: email,
            password: password,
        });

        request.open("POST", 'http://localhost:9000/employee')
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

    getEmployee(id) {

        let request = new XMLHttpRequest();

        request.open('GET', `http://localhost:9000/employee/${id}`, false);
        request.send();

        if (request.status != 200) {
            console.log( request.status + ': ' + request.statusText );
        } else {
            let response = JSON.parse(request.responseText);

            if (response.Err == null) {

                let employee = new Employee( response.Data.id,
                                             response.Data.name,
                                             response.Data.surname,
                                             response.Data.password,
                                             response.Data.login,
                                             response.Data.email);

                return employee

            } else {
                console.log(response.Err)
            }
        }
    }

    getEmployeesFromArray(arrayOfEmployeesId) {

        let map = new Map();
            
        for (let employeeId of arrayOfEmployeesId) {
            map.set(employeeId, this.getEmployee(employeeId))
        }

        return map;
    }

    getMapOfEmployees() {

        let request = new XMLHttpRequest();

        request.open('GET', `http://localhost:9000/employee`, false);
        request.send();

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

                    mapOfEmployees.set(emp.id, employee)
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

    deleteEmployee(id) {

        let request = new XMLHttpRequest();

        request.open('DELETE', `http://localhost:9000/employee/${id}`, false);
        request.send();
        
        if (request.status != 200) {
            console.log( request.status + ': ' + request.statusText );
            return request.status
        } else {

            let response = JSON.parse(request.responseText);

            if (response.Err != null) {
                console.log(response.Err)
                return response.Err
            }
            return null
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

