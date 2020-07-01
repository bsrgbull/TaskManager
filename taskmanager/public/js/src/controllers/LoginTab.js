 'use strict'

class LoginTab {

	employeesModel;
	#loginView;

	constructor() {
    	this.#loginView = new LoginView();
    }

 	login(log, pass, employeesModel) {

 		let ifLogin = this.employeesModel.login(log,pass);
 		alert(ifLogin);
 		return ifLogin;

 	}

 	setEmployeesModel(emp) {

 		this.employeesModel = emp;

 	}

 	getLoginView() {
 		return this.#loginView;
 	}
}