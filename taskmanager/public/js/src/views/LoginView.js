'use strict'

class LoginView {

	showLoginPage() {
	$$("toolbarButtonsON").hide();
        $$("addTaskButton").hide();
        $$("projectName").hide();
        $$("exitButton").hide();
        $$("tasksPage").hide();
        $$("projectPage").hide();
        $$("taskButtonsOff").show();
        $$("loginButton").show();
        $$("registrationButton").show();
        $$("startLabel").show();
        $$("authenticationButtons").show();
	}
} 
