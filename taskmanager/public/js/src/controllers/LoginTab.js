 'use strict'

class LoginTab {

	employeesModel;
	#loginView;

	constructor() {
    	this.#loginView = new LoginView();
    }

 	async login(log, pass) {
 		return await this.employeesModel.login(log,pass);
 	}

 	setEmployeesModel(emp) {

 		this.employeesModel = emp;

 	}

 	getLoginView() {
 		return this.#loginView;
	}
	
	show() {
		this.#loginView.showLoginPage();
	}
}