'use strict'

class ProjectView {

    showProjectPage(projectsModel) {

        $$("projectsList").clearAll();
        $$("projectInfo").define("template", " ");
        $$("projectInfo").refresh();

        $$("toolbarButtonsON").show();
        $$("myProjectsButton").show();
        $$("addTaskButton").hide();
        $$("projectName").hide();
        $$("exitButton").show();
        $$("tasksPage").hide();
        $$("projectPage").show();
        $$("employeesPage").hide();
        $$("taskButtonsOff").hide();

        let addproject = this.addProject;

        projectsModel.getMapOfProjects().forEach(function(item, index, array) {
            addproject(item);
        });
    }

    addProject(project) {
        $$("projectsList").add({
            id:`${project.getId()}`,
            title:`${project.getName()}`,
        },0);
    }

    addNewProject(id, name) {
        $$("projectsList").add({
            id:id,
            title:name,
        },0);
    }

    updateProject(id, name, creatorId, aimOfTheProject) {
        $$("projectsList").remove(id);
        this.addNewProject(id, name, creatorId, aimOfTheProject);
    }


    deleteProject(id) {
        $$("projectsList").remove(id);
    }

    clearAll() {
        $$("projectsList").clearAll();
    }
}