'use strict'

class ProjectView {

    showProjectPage() {
        $$("toolbarButtonsON").show();
        $$("myProjectsButton").show();
        $$("addTaskButton").hide();
        $$("projectName").hide();
        $$("exitButton").show();
        $$("tasksPage").hide();
        $$("projectPage").show();
        $$("employeesPage").hide();
        $$("taskButtonsOff").hide();
    }

    showProjectInfo(id) {

    }

    showProjectForm() {

    }

    hideProjectForm() {

    }

    addProject(project) {
        $$("projectsList").add({
            id:`${project.getId()}`,
            title:`${project.getName()}`,
        },0);
    }

    deleteProject(id) {
    //    alert(id);
        $$("projectsList").remove(id);
    }

    hideAll() {
        
    }
}