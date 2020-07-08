'use strict'

let projectsTab;
let employeesTab;
let tasksTab;
let loginTab;
let projectsModel;
let tasksView;
let projectView;
let employeesView;
let loginView;


let webixReady = webix.ready(function () {
    
    employeesTab = new EmployeesTab();
    tasksTab = new TasksTab();
    projectsTab = new ProjectsTab(tasksTab);
    loginTab = new LoginTab();
    loginTab.setEmployeesModel(employeesTab.getEmployeesModel());
    projectsModel = projectsTab.getProjectsModel();
    projectView = projectsTab.getProjectView();
    tasksView = tasksTab.getTasksView();
    employeesView = employeesTab.getEmployeesView();

    //В этой переменной запоминаем id задачи, по иконке которой нажали
    let idOfTaskClicked;

    //В этой переменной последний открытый проект
    let currentProject;

    //В этой переменной запоминаем задачу, на которую нажали
    let taskClicked

    //Русификация
    webix.i18n.locales["ru-RU"].kanban = {
        "copy" : "Копировать",
        "dnd" : "Бросайте файлы сюда",
        "remove" : "Удалить",
        "save" : "Сохранить",
        "confirm" : "Вы собираетесь навсегда удалить эту карточку. Вы уверены?",
        "editor":{
            "add" : "Добавить карточку",
            "assign" : "Назначить",
            "attachments" : "Вложения",
            "color" : "Цвет",
            "head" : "Редактор",
            "status" : "Статус",
            "tags" : "Метки",
            "text" : "Текст",
            "upload" : "Загрузить",
            "edit": "Редактировать"
        },
        "menu":{
            "copy": "Копировать",
            "edit": "Редактировать",
            "remove": "Удалить"
        }
    };
    
    webix.i18n.setLocale("ru-RU");


    //Обработка drop в kabanlist1, если перемещение в Создано, то удаляем Сотрудника
    let dropHandler1 = function(context, e) {
        let status = $$("kanban").getItem(context.start).status;

        if (status != "Назначено" && status != "Создано"){

            webix.message("Нельзя переместить задачу в работе в колонку Создано");

            return false;
        } else {
            $$("kanban").getItem(context.start).user_id = null;
            $$("kanban").updateItem(context.start);
            tasksTab.getTask(context.start).then( task => { 

                tasksTab.updateTask(task, null, null, null, +context.start,
                        null, null, "Создано", null, 0);

                return true;
            });
        }
    }

    //Обработка drop в kabanlist2
    let dropHandler2 = function(context, e) {
        let task = $$("kanban").getItem(context.start);

        if (task.status != "Создано" && task.status != "Назначено") {

                webix.message("Нельзя переместить задачу в работе в колонку Назначено");

            return false;
        }

        if (task.user_id == 0 || task.user_id == null) {

                webix.message("Сначала назначьте сотрудника");

            return false;

        } else {
            tasksTab.getTask(context.start).then( task => { 
                tasksTab.updateTask(task, null, null, null, +context.start,
                        null, null, "Назначено", null, 0);

                return true;
            });
        }
    }

    //Обработка drop в kabanlist3
    let dropHandler3 = function(context, e) {

        let status = $$("kanban").getItem(context.start).status;

        let task = tasksTab.getMapOfTasks().get(+context.start);

        let estimatedTime = task.getEstimatedTime();

        if ( status == "Создано"){
            
            webix.message("Сначала назначьте сотрудника и оцените время, " +
                                    "необходимое для выполнения этой задачи");

            return false;
        }

        if ( estimatedTime == 0 ) {

            webix.message("Установите оценочное время выполнения задачи перед отправлением задачи в работу");

            return false;

        } else {
            tasksTab.updateTask(task, null, null, null, +context.start,
                null, null, "В работе", null, null);

            return true;
        }
    }

    //Обработка drop в kabanlist4
    let dropHandler4 = function(context, e) {
        let status = $$("kanban").getItem(context.start).status;

        let task = tasksTab.getMapOfTasks().get(+context.start);

        let spentTime = task.getSpentTime();

        if ( status == "Создано"  || status == "Назначено" ){

            webix.message("Сначала переместите задачу в работу");

            return false;

        }

        if ( spentTime == 0 ){

                webix.message("Установите окончательное время выполнения задачи перед перемещением");

            return false;

        } else {
            tasksTab.updateTask(task, null, null, null, +context.start,
                null, null, "Завершено", null, null);
                return true;
        }

    }  

    //Обработчик кнопки Добавить в проект
    let addEmployeeHandler = function(id,event){

        //Удаляет предыдущее окно, если оно создавалось
        if ($$("modalWindowForAddingEmployeesToProject")) {
            $$("modalWindowForAddingEmployeesToProject").close();
        }

        webix.ui({
            id:"modalWindowForAddingEmployeesToProject",
            view:"window",
            head:"Добавить сотрудника:",
            width: 500,
            height: 500,
            modal:true,
            close:true,
            position: "center",
            body: { 
                rows:[
                    {
                        //Таблица на странице Проектов
                        view:"datatable", id:"employeesTableInModalWindow",
                        columns:[
                            { id:"idOfEmployeeInModalWindow", hidden:true},
                            { id:"nameOfEmployeeInModalWindow",    header:"Имя",              width:200},
                            { id:"surnameOfEmployeeInModalWindow",   header:"Фамилия",    width:200},
                        ],
                        select:true,
                    },
                    { cols:[
                        { view: "button", value: "Добавить", click:function(id,event){

                            let emplId;
                            
                            if ($$("employeesTableInModalWindow").getSelectedItem() != undefined) {
                                emplId = $$("employeesTableInModalWindow").getSelectedItem().idOfEmployeeInModalWindow;
                            }

                            if (emplId != "" && emplId != undefined ) {
                                currentProject.addEmployee(emplId);
                                projectsTab.addEmployeeToProject(currentProject.getId(), emplId);
                                tasksTab.getTasksFromProject(currentProject.getId()).then( mapOfTasks => {
                                                                      
                                    employeesTab.getEmployeesFromArray(
                                        currentProject.getArrayOfEmployeesId())
                                            .then( mapOfEmployees => {

                                                tasksTab.showTaskPage(mapOfTasks, mapOfEmployees);
                                                $$("modalWindowForAddingEmployeesToProject").close();

                                            });                    

                                })

                            }
                        } },
                        { view: "button", value: "Отмена", click:function(id,event){
                            $$("modalWindowForAddingEmployeesToProject").close();
                        } }
                    ]},
                ]
            },
        }).show()

        projectsTab.getProject(currentProject.getId())
            .then( project => {

                tasksTab.getTasksView().addEmployeesInModalWindow(
                    employeesTab.getEmployeesModel(), project);

            });
    }

    //Обработчик кнопок Добавить и Изменить сотрудника
    let addOrChangeEmployee = function(id,event){
        //Удаляет предыдущее окно, если оно создавалось
        if ($$("modalWindowForEmployees")) {
            $$("modalWindowForEmployees").close();
        }   

        let addingFunction = function() {

            let name = $$("modalEmployeeName").getValue();
            let surname = $$("modalEmployeeSurname").getValue();
            let email = $$("modalEmployeeEmail").getValue();
            let login = $$("modalEmployeeLogin").getValue();
            let password = $$("modalEmployeePassword").getValue();

            if (!$$("addOrChangeForm").validate() && email != "" 
            || name == "" || surname == "" /*|| password == ""*/) {

                webix.message({ type:"error", text:"Неверные данные" });
                return;
            }

            employeesTab.addNewEmployee(name, surname, password, login, email)
            $$("modalWindowForEmployees").close();
        }
        
        let changingFunction = function() {
            let id = $$("employeesTable").getSelectedId().id;
            let name = $$("modalEmployeeName").getValue();
            let surname = $$("modalEmployeeSurname").getValue();
            let password = $$("modalEmployeePassword").getValue();
            let login = $$("modalEmployeeLogin").getValue();
            let email = $$("modalEmployeeEmail").getValue();

            if (!$$("addOrChangeForm").validate() && email != "" 
            || name == "" || surname == "" /*|| password == ""*/) {

                webix.message({ type:"error", text:"Неверные данные" });
                return;
            }

            employeesTab.updateEmployee(id, name, surname, password, login, email);
            $$("modalWindowForEmployees").close();
        }

        let window = webix.ui({
            id:"modalWindowForEmployees",
            view:"window",
            head:{
                view:"toolbar", cols:[
                    { width: 50 },
                    { id:"addOrChangeLable", view:"label", type:"header", align:"center",
                      label: `<span class='addCard'>Новый сотрудник</span>`,},
                    { view:"button", label: 'X', width: 50, align: 'right',
                      click:function() { $$('modalWindowForEmployees').close(); } }
                ]
            },
            width: 500,
            height: 400,
            modal:true,
            close:true,
            position: "center",
            body: {
                id:"addOrChangeForm",
                view: "form",
                elements: [
                    { id:"modalEmployeeName", view: "text", value:``, label: 'Имя*', name: "name" },
                    { id:"modalEmployeeSurname", view: "text", label: 'Фамилия*', name: "surname" },
                    { id:"modalEmployeeEmail", view: "text", label: 'Email', name: "email"},
                    { id:"modalEmployeeLogin", view: "text", label: 'Логин', name: "login", hidden: true },
                    { id:"modalEmployeePassword", view: "text", label: 'Пароль*', name: "password", hidden: true },
                    { template:"* поле обязательно для заполнения" },
                    { cols:[
                        { id: "addButton", view: "button", value: "Добавить",
                          click:addingFunction, hidden:false },
                        { id: "changeButton", view: "button", value: "Изменить",
                          click:changingFunction, hidden:true },
                        { view: "button", value: "Отмена", click:function(id,event){
                            $$("modalWindowForEmployees").close();
                        } }
                    ]},
                ],
                rules:{
                    "email":webix.rules.isEmail,
                    "name":webix.rules.isNotEmpty,
                    "surname":webix.rules.isNotEmpty,
                },
                elementsConfig: {
                  labelPosition: "top",
                }
            },
        });

        if (id == "changeEmployeeButton") {
            if ($$("employeesTable").getSelectedId() != undefined) {
                $$("changeButton").show();
                $$("addButton").hide();
                $$("addOrChangeLable").setHTML(`<span class='addCard'>Изменить данные</span>`);

                employeesTab.getEmployee($$("employeesTable").getSelectedId())
                    .then( employee => {

                        $$("addOrChangeForm").setValues({ name:employee.getName(),
                            surname:employee.getSurname(),
                            email:employee.getEmail(),
                            login:employee.getLogin(),
                        });  

                    });
                             
            } else return;
        } else {
            $$("changeButton").hide();
            $$("addButton").show();
        }

        window.show()
    }

    //Обработчик кнопки Удалить из проекта
    let deleteEmployeeHandler = function(id, event) {

        if ($$("listOfEmployees").getSelectedItem() != undefined ) {
            let selectedId = $$("listOfEmployees").getSelectedId();
            webix.modalbox({
                title:"Вы уверены что хотите удалить сотрудника?",
                buttons:["Да", "Отмена"],
                width:500,
                text:""
            }).then(function(result) {
            let type = "";
            if(result == 0) {
                projectsTab.deleteEmployeeFromProject(currentProject.getId(), selectedId.replace("employee", ""));
                currentProject.deleteEmployee(selectedId.replace("employee", ""));
                $$("listOfEmployees").remove(selectedId);
                type = "success";
            } else if(result == 1) type = "error";
    
            });
        }
    }

    //Обработчик кнопки Удалить сотрудника
    let deleteEmployee = function(id, event) {

        let empId;

        if ($$("employeesTable").getSelectedItem() != undefined) {
            empId = $$("employeesTable").getSelectedItem().id;
        }

        if (empId != "" && empId != undefined ) {
            webix.modalbox({
                title:"Вы собираетесь навсегда удалить этого сотрудника. Вы уверены?",
                buttons:["Удалить", "Отмена"],
                width:500,
                text:""
            }).then(function(result) {
                let type = "";
                if(result == 0) {
                    employeesTab.deleteEmployee(empId);
                    type = "success";
                } else if(result == 1) type = "error";
        
            });
        }
    }

    //Обработчик кнопок Новый проект и Изменить
    let addOrChangeProject = function(id, event) {
        //Удаляет предыдущее окно, если оно создавалось
        if ($$("modalWindowForProjects")) {
            $$("modalWindowForProjects").close();
        } 

        let addingProjectFunction = function() {

            let name = $$("modalProjectName").getValue();
            let aim = $$("modalProjectAim").getValue();

            if ( !$$("addOrChangeProjectForm").validate() ) {

                webix.message({ type:"error", text:"Неверные данные" });
                return;
            }

            projectsTab.addNewProject(name, 1, aim,[1]);

            $$("modalWindowForProjects").close();
        }
        
        let changingProjectFunction = function() {

            let id = $$("projectsList").getSelectedId();
            let name = $$("modalProjectName").getValue();
            let aim = $$("modalProjectAim").getValue();

            if ( !$$("addOrChangeProjectForm").validate() ) {

                webix.message({ type:"error", text:"Неверные данные" });
                return;
            }

            projectsTab.getProject(id).then( project => {
                
                projectsTab.updateProject(+id, name, project.getArrayOfEmployeesId(),
                                                            +project.getCreatorId(), aim);
                (async () => {
                    let info;
                    await projectsTab.getProjectInfo(employeesTab, id).then( result => { info = result })
                    $$("projectInfo").define("template", info );
                    $$("projectInfo").refresh();
                })();                                                            
                $$("modalWindowForProjects").close();

            });
        }

        let window = webix.ui({
            id:"modalWindowForProjects",
            view:"window",
            head:{
                view:"toolbar", cols:[
                    { width: 50 },
                    { id:"addOrChangeProjectLable", view:"label", type:"header", align:"center",
                      label: `<span class='addCard'>Новый проект</span>`,},
                    { view:"button", label: 'X', width: 50, align: 'right',
                      click:function() { $$('modalWindowForProjects').close(); } }
                ]
            },
            width: 500,
            height: 300,
            modal:true,
            close:true,
            position: "center",
            body: {
                id:"addOrChangeProjectForm",
                view: "form",
                elements: [
                    { id:"modalProjectName", view: "text", label: 'Название*', name: "name" },
                    { id:"modalProjectAim", view: "text", label: 'Цель проекта', name: "aim" },
                    { template:"* поле обязательно для заполнения" },
                    { cols:[
                        { id: "acceptAddProjectButton", view: "button", value: "Добавить",
                          click:addingProjectFunction, hidden:false,
                        },
                        { id: "acceptChangeProjectButton", view: "button", value: "Изменить",
                          click:changingProjectFunction, hidden:true },
                        { view: "button", value: "Отмена", 
                            click:function(id,event){
                                $$("modalWindowForProjects").close();
                            } 
                        },
                    ]},
                ],
                rules:{
                    "name":webix.rules.isNotEmpty,
                },
                elementsConfig: {
                    labelPosition: "top",
                }
            },
        });

        if (id == "changeProjectButton") {
            if ($$("projectsList").getSelectedId() != "") {
                $$("acceptChangeProjectButton").show();
                $$("acceptAddProjectButton").hide();
                $$("addOrChangeProjectLable").setHTML(`<span class='addCard'>Изменить данные</span>`);

                projectsTab.getProject($$("projectsList").getSelectedId())
                    .then( project => {

                        $$("addOrChangeProjectForm").setValues({ 
                            name:project.getName(),
                            aim:project.getAimOfTheProject(),
                        });  

                    });
                             
            } else return;
        } else {
            $$("acceptChangeProjectButton").hide();
            $$("acceptAddProjectButton").show();
        }

        window.show()
    }

    //Удаление проекта
    let deleteProjectHandler = function(id, event) {

        let prId = $$("projectsList").getSelectedId();

        if (prId != "" && prId != undefined ) {
            webix.modalbox({
                title:"Вы собираетесь навсегда удалить этот проект. Вы уверены?",
                buttons:["Удалить", "Отмена"],
                width:500,
                text:""
            }).then(function(result) {
                let type = "";
                if(result == 0) {
                    projectsTab.deleteProject(prId);
                    type = "success";
                } else if(result == 1) type = "error";
        
            });
        }
    }

    //Обработка нажатия на кнопку Войти
    let loginForm = function() {
        //Удаляет предыдущее окно, если оно создавалось
        if ($$("modalLogin")) {
            $$("modalLogin").close();
        }        

        webix.ui({
            id:"modalLogin",
            view:"window",
            head:{
                view:"toolbar", cols:[
                    { view:"label", type:"header", label: `<span class='addCard'>Войти в систему</span>`,},
                    { view:"button", label: 'X', width: 100, align: 'right',
                      click:function(){ $$('modalLogin').close(); }}
                ]
            },
            width: 400,
            height: 250,
            modal:true,
            close:true,
            position: "center",
            body: {
                view: "form",
                elements: [
                    { id: "userLogin", view:"text", label:'Логин/Email', name:"user.login" },
                    { id: "userPassword", view:"text", label:'Пароль', name:"user.password" },
                    { id: "submit", view:"button", value: "Войти", click:tryToLogin}
                ],
                elementsConfig: {
                    labelPosition: "top",
                }
            },
          }).show()
    }

    //Добавление новой карточки
    let addNewTask = function(id, event) {
        //Удаляет предыдущее окно, если оно создавалось
        if ($$("modalWindowForAddingTasks")) {
            $$("modalWindowForAddingTasks").close();
        }        

        webix.ui({
            id:"modalWindowForAddingTasks",
            view:"window",
            head:{
                view:"toolbar", cols:[
                    { view:"label", type:"header", label: `<span class='addCard'>Добавить карточку</span>`,},
                    { view:"button", label: 'X', width: 100, align: 'right',
                      click:function(){ $$('modalWindowForAddingTasks').close(); }}
                ]
            },
            width: 500,
            height: 250,
            modal:true,
            close:true,
            position: "center",
            body: {
                view: "form",
                elements: [
                    { id: "taskText", view:"textarea", label:"Текст", labelAlign:"left", height:100, },
                    { cols:[
                        { view: "button", value: "Добавить", click:function(id,event){
                            let text = $$("taskText").getValue();

                            if (text == "") {
                                return;
                            }

                            tasksTab.addNewTask(text, 1, +currentProject.getId() );
                            $$("modalWindowForAddingTasks").close();
                        } },
                        { view: "button", value: "Отмена", click:function(id,event){
                            $$("modalWindowForAddingTasks").close();
                        } }
                    ]},
                ],
                elementsConfig: {
                    labelPosition: "top",
                }
              },
          }).show()
    }

    //Изменяем заголовок при заходе в проект
    let openProjectHandler = async function(id, event) {
        if ($$("projectsList").getSelectedId() != "" ){

            await projectsTab.getProject(Number($$("projectsList").getSelectedId() ) )
                .then( result => {currentProject = result} );

            let mapOfTasks = await tasksTab.getTasksFromProject($$("projectsList").getSelectedId());
            let mapOfEmployees = employeesTab.getEmployeesFromArray(currentProject.getArrayOfEmployeesId());

            employeesTab.getEmployeesFromArray(currentProject.getArrayOfEmployeesId())
                .then( mapOfEmployees => {

                    tasksTab.showTaskPage(mapOfTasks, mapOfEmployees);
                    $$("projectName").define("template", currentProject.getName());
                    $$("projectName").refresh();

                });
        }
    }
    
    let tryToLogin = function (id) {
        
        loginTab.login($$("userLogin").getValue(), $$("userPassword").getValue(), employeesTab.getEmployeesModel());

    }

    //Изменение списка сотрудников в зависимости от статуса карточки
    async function changeUserList(id) {

        $$("kanban").getUsers().clearAll();

        if ($$("kanban").getItem(id).status != "Создано") { 
                await tasksTab.addEmployeeInList(id);
        } else {

            let arrayOfEmployeesId = currentProject.getArrayOfEmployeesId();

            let addemployeeinlist = tasksTab.getTasksView().addEmployeeInList;

            for (let id of arrayOfEmployeesId) {

                addemployeeinlist(employeesTab.getEmployee(id));
                
            }
        }
    }


    //Здесь можно настроить обработку Drag&Drop у каждого столбца
    webix.protoUI({
        name:"mykanbanlistsolved",
        $dragCreate:function(){ return false },
    }, webix.ui.kanbanlist);
    
    webix.ui({
        rows:[
            {
                css: "toolbar",
                borderless: true,
                paddingY:7,
                paddingX:10,
                margin: 7,
                //Кнопки сверху
                cols:[
                    { id:"toolbarButtonsON",cols:[
                        { id:"myProjectsButton", view: "button",  label: "Мои проекты",
                            click:"projectsTab.show()", width: 150},
                        { id:"employeesButton", view: "button",  label: "Сотрудники",
                            click:"employeesTab.show()",width: 150},
                        { id:"addTaskButton", view: "button",  label: "+", width: 50, hidden:true,
                        click:() => { addNewTask(); }  },
                        { id:"projectName", template:"Проект", type:"header", borderless:true },
                        { id:"search", view: "search", placeholder:"Поиск..", width: 300, hidden:true},
                    ], hidden:false},
                    { id:"taskButtonsOff", cols:[ {}, {}, {}, {} ], hidden:false},
                    { id:"authenticationButtons", cols:[
                        { id:"exitButton", view: "button", type: "form",
                         label: "Выйти", width: 150, hidden:true},
                        { id:"loginButton", view: "button", type: "form",
                         label: "Войти", width: 150, hidden:false, click:() => { loginForm(); }},
                        { id:"registrationButton", view: "button", type: "form", 
                         label: "Зарегистрироваться", width: 200, hidden:false},
                    ], hidden:true},
                ]
            },
            { 
                //Задачи
                cols:[
                {   
                    id:"kanban",
                    view:"kanban",
                    on:{
                       /* onListIconClick: function(id, itemId){
                            idOfTaskClicked = itemId;
                            tasksTab.getTask(itemId).then( task => { 
                               taskClicked = task
                               changeUserList(+itemId);
                            });
                        },*/
                        onListItemClick: function(id,ev,node,list){
                            idOfTaskClicked = id;
                            tasksTab.getTask(id).then( task => {
                                taskClicked = task
                                changeUserList(+id);
                            });

                        },

                        onBeforeEditorShow:async function(editor,obj) {

                            $$("kanban").getEditor().config.width = 575;

                        	$$("userListInEditor").getList().clearAll();

                        	let statusList = $$("status").getList();
                        	statusList.parse($$("kanban").getStatuses());

                            let arrayOfEmployeesId = currentProject.getArrayOfEmployeesId();

                            await tasksTab.getTask(obj.id).then( task => { 
                                
                                let assignedToId = task.getAssignedToId();

                        	    if (obj.status != "Создано") {

                                    employeesTab.getEmployee(+assignedToId)
                                        .then( employee => {

                                            $$("userListInEditor").getList().add({
                                                id: employee.getId(),
                                                value: employee.getSurnameAndName(),
                                            });

                                            $$("userListInEditor").define({ value:assignedToId});
                                            $$("userListInEditor").refresh();
                                        });
                                
                        	    } else {

                                    employeesTab.getEmployeesFromArray(arrayOfEmployeesId)
                                        .then( mapOfEmployees => {
                                            
                                            mapOfEmployees.forEach( employee => {

                                                $$("userListInEditor").getList().add({
                                                    id: employee.getId(),
                                                    value: employee.getSurnameAndName(),    
                                                });

                                            });

                                            $$("userListInEditor").define({ value:assignedToId});
                                            $$("userListInEditor").refresh();
                                        });
                                }

                                $$("estimatedTime").setValue(Number(task.getEstimatedTime()));
                                $$("spentTime").setValue(Number(task.getSpentTime()));
                                $$("priority").setValue(task.getColor());
                            });
                        },
                      },
                    cols:[
                        { header:"Создано", body:{ id:"kanbanlist1", view:"kanbanlist",
                          status:"Создано", on:{ onBeforeDrop:dropHandler1,},} },
                        { header:"Назначено", body:{ id:"kanbanlist2", view:"kanbanlist",
                          status:"Назначено", on:{ onBeforeDrop:dropHandler2},} },
                        { header:"В работе", body:{ id:"kanbanlist3", view:"kanbanlist",
                          status:"В работе", on:{ onBeforeDrop: dropHandler3},} },
                        { header:"Завершено", body:{ id:"kanbanlist4", view:"mykanbanlistsolved",
                          status:"Завершено", on:{ onBeforeDrop:dropHandler4}, } 
                        }
                    ],
                  //  colors:colors,
                    editor:[    
                        { cols:[
                            { rows:[
                                { id: "estimatedTime", view:"counter", inputAlign:"right",
                                  name:"time", step:Number(1,25), label:"Оценочное время, ч", validate:webix.rules.isNumber },
                                { id: "spentTime", view:"counter", inputAlign:"right",
                                  name:"time", step:Number(1,25), value: 68, label:"Фактическое время, ч" },

                                ]},
                            { view:"textarea", name:"text", width:380, label:"Текст", height:120 }, 
                        ]},                                                                 
                        { cols:[       
                        	{ id: "userListInEditor", view:"richselect", name:"name", label:"Назначить", value:"", options: [] },
                            { id: "testings", view:"richselect", name:"name", label:"Назначить", options:[], hidden:true },   
                            { id: "priority", view:"richselect", label:"Приоритет", value:"", options:[
                                    {id:"green", value:"Низкий", color:"green"}, 
                                    {id:"orange", value:"Нормальный", color:"orange"},   
                                    {id:"red", value:"Срочно", color:"red"}    
                            ] },
                            { id: "status", view:"richselect", name:"$list", label:"Статус", options:[] }     
                        ]},
                    ],
                    comments:false,
                    scheme:{
                        $sort:{
                          dir:"desc",
                          by:"text",
                          as:"string"
                        }
                    }, 
                    userList:{                  
                     //   yCount:9,   
                        autoheight:true,          
                        width:250               
                    },
                    drag:false,
                },
                {   
                    rows:[
                        { id:"listOfEmployeesInProject", template:"Список сотрудников", type:"header" },
                        {
                            id:"listOfEmployees",
                            view:"list",
                            width:180,
                            template:"#title#",
                            select:true,
                        },
                        { id:"deleteEmployee", view:"button", value:"Удалить",
                          inputWidth:180, click:deleteEmployeeHandler },
                        { id:"addEmployee", view:"button", value:"Добавить",
                          inputWidth:180, click:addEmployeeHandler },
                    ]
                },    
            ], hidden:true, id:"tasksPage"
            },
            { //Надпись Task Manager
                id:"startLabel",
                view:"label", 
                label:"<span class='myClass'>Task Manager</span>",
                align:"center",
                height:"300",
                css:"myClass",      
                hidden:true,   
            },
            {
                rows:[	
                    { view:"toolbar", cols:[
                        { view:"button", value:"Открыть", width:150,
                        css:"webix_danger", align:"left", click:openProjectHandler},
                        { id:"addProjectButton", view:"button", value:"Новый проект", width:150, align:"left",
                        css:"webix_primary", click:addOrChangeProject},
                        { id:"changeProjectButton", view:"button", value:"Изменить", width:100,
                          align:"left", click:addOrChangeProject},
                        { view:"button", value:"Удалить", width:100, align:"left",
                        click:deleteProjectHandler},
                        ]
                    },
                    { cols:[
                        { rows:[
                            { view:"text", label:"Название", hidden:true},
			                { margin:5, hidden:true, cols:[
				                    { view:"button", value:"Создать" , css:"webix_primary" },
				                    { view:"button", value:"Отмена" }
			                ]},
                            { view:"list",
                              id:"projectsList",
                              template:"#title#",
                              width: 300,
                              select:true,
                              on:{
                                    onItemClick: function(id, e, node){
                                        (async () => {
                                            let info;
                                            await projectsTab.getProjectInfo(employeesTab, id).then( result => { info = result })
                                            $$("projectInfo").define("template", info );
                                            $$("projectInfo").refresh();
                                        })();
                                    },
                                 },
                            },
                        ], height:560},
                        {
                            template: ' ',
                            autoheight:true,
                            id:"projectInfo",
                        },
                    ]}
                ], hidden:false, id:"projectPage"
            },
            {
                rows:[	
                    { view:"toolbar", cols:[
                        { id:"addEmployeeButton", view:"button", value:"Добавить", width:150,
                          align:"left", css:"webix_primary", click:addOrChangeEmployee},
                        { id:"changeEmployeeButton", view:"button", value:"Изменить", width:100,
                          align:"left", click:addOrChangeEmployee},
                        { view:"button", value:"Удалить", width:100, align:"left", click:deleteEmployee},
                        ]
                    },
                    {   //Таблица на странице Сотрудники
                        view:"datatable", id:"employeesTable",
                        columns:[
                            { id:"id", hidden:true},
                            { id:"nameOfEmployee", header:"Имя", sort:"string", width:200},
                            { id:"surnameOfEmployee", header:"Фамилия", sort:"string", width:200},
                            { id:"login", header:"Логин", width:200, sort:"string", hidden:true},
                            { id:"email", header:"email", width:300, sort:"string"}
                        ],
                        select:true,
                    },
                   /* { cols:[
                        { rows:[
                            { view:"text", label:"Название", hidden:false},
			                { margin:5, hidden:false, cols:[
				                    { view:"button", value:"Создать" , css:"webix_primary" },
				                    { view:"button", value:"Отмена" }
			                ]},
                            { view:"list", id:"employeesList",
                                template:"#title#",
                                width: 300,
                                select:true,
                            },
                        ]},
                        /*{ type:"clean", rows:[
                            { id:"employeesViews", cells:[
                                { view:"template", id:"emptpl", template:"Информация о сотруднике" },
                            ]}
                        ]}
                    ]}*/
                ], hidden:true, id:"employeesPage"
            },
        ]
    });
    
    //Обработка изменений в editor. $list: 0 - "Создано"; 1 - "Назначено"; 2 - "В работе"; 3 - "Завершено"
    $$("kanban").attachEvent("onBeforeEditorAction",function(action,editor,data){



        let dataUserId = $$("userListInEditor").data.value;

        if (action === "save"){      
            
            if ( data.text == "" ) {

                webix.message("У задачи должно быть описание");

                return false;
            }

            let cardStatus = null;

            switch (data.status) {

                case "Создано":

                	if (data.$list == 3 || data.$list == 2 ) {

                        webix.message("Созданную задачу можно переместить только в колонку Назначено");

                        return false;
                    } else {    
        
                        if (data.$list == 1 && dataUserId == 0 ) {

                            webix.message("Сначала назначьте сотрудника");

                            return false;
                        }
                        if ($$("spentTime").getValue() != taskClicked.getSpentTime()) {

                            webix.message("Итоговое время можно менять только у задач в работе");

                            return false;
                        }

                        let userId = null;
                        
                        //Если назначается Сотрудник, то перемещаем его сразу в колонку 2
                        if (dataUserId != taskClicked.getAssignedToId()
                        && dataUserId != undefined && dataUserId != null && dataUserId != "") {
                            data.$list = 1;            

                            userId = dataUserId;
                            cardStatus = "Назначено";
                     
                        }

                        tasksTab.updateTask(taskClicked, data.text, null, null, taskClicked.getId(),
                        +$$("estimatedTime").getValue(), null, cardStatus, $$("priority").getValue(), +userId);

                        taskClicked.setEstimatedTime($$("estimatedTime").getValue());
                        taskClicked.setAssignedToId(+userId);

                        tasksTab.getMapOfTasks().set(+taskClicked.getId(), taskClicked);

                        $$("kanban").getItem(idOfTaskClicked).color = $$("priority").getValue();

                        return true;
                    }
                    break;
                
                case "Назначено":

                    if (data.$list == 3) {

                        webix.message("Сначала переместите задачу в работу");

                        return false;

                    }     

                    if ($$("spentTime").getValue() != taskClicked.getSpentTime()) {

                        webix.message("Итоговое время можно менять только у задач в работе");

                        return false;
                    }

                    if ( data.text != $$("kanban").getItem(data.id).text ) {

                        webix.message("Нельзя изменять назначенное задание");

                        return false;

                    }

                    if ( $$("priority").getValue() != taskClicked.getColor() ) {

                        webix.message("Приоритет можно изменить только у задач в колонке Создано");

                        return false;

                    }

                    if (data.$list == 0 ) {

                        dataUserId = null;  //Если перемещаем в Создано, то удаляем Сотрудника

                        tasksTab.updateTask(taskClicked, data.text, null, null, taskClicked.getId(),
                        +$$("estimatedTime").getValue(), null, "Создано", null, 0);

                        taskClicked.setEstimatedTime($$("estimatedTime").getValue());
                        tasksTab.getMapOfTasks().set(+taskClicked.getId(), taskClicked);

                        return true;
                    } 

                    if (data.$list == 2) {

                        if ($$("estimatedTime").getValue() == 0 ) {

                            webix.message("Оцените время выполнения задачи, перед сменой статуса");

                            return false;
                        }
                            
                        cardStatus = "В работе";
                	}

                    tasksTab.updateTask(taskClicked, null, null, null, taskClicked.getId(),
                    +$$("estimatedTime").getValue(), null, cardStatus, null, null);

                    taskClicked.setEstimatedTime($$("estimatedTime").getValue());
                    tasksTab.getMapOfTasks().set(+taskClicked.getId(), taskClicked);

                    return true;

                    break;

                case "В работе":

                    if ( data.$list == 0 || data.$list == 1 ) {

                        webix.message("Перемещение возможно только в колонку Завершено");

                        return false;
                    }

                    if ( data.text != $$("kanban").getItem(data.id).text ) {

                        webix.message("Нельзя изменять задание в работе");

                        return false;
                    }
                    
                    if ( $$("estimatedTime").getValue() != taskClicked.getEstimatedTime() ) {

                        webix.message("Задача уже в работе, нельзя изменить оценочное время");

                        return false;

                    }

                    if ( $$("priority").getValue() != taskClicked.getColor() ) {

                        webix.message("Приоритет можно изменить только у задач в колонке Создано");

                        return false;

                    }
                    
                    if (data.$list == 3) {

                        if ( $$("spentTime").getValue() != 0) {    
                                
                            cardStatus = "Завершено";

                        } else {

                            webix.message("Укажите время, потраченное на выполнение задачи");

                            return false;
                        }
                    }

                    tasksTab.updateTask(taskClicked, null, null, null, taskClicked.getId(),
                    null, +$$("spentTime").getValue(), cardStatus, null, null);

                    taskClicked.setSpentTime($$("spentTime").getValue());
                    tasksTab.getMapOfTasks().set(+taskClicked.getId(), taskClicked);

                    return true;
                    break;

                case "Завершено":

                    if ( $$("estimatedTime").getValue() != taskClicked.getEstimatedTime() 
                        || $$("spentTime").getValue() != taskClicked.getSpentTime()
                        || data.text != $$("kanban").getItem(data.id).text
                        || $$("priority").getValue() != taskClicked.getColor()
                        || data.$list != 3 ) {

                        webix.message("Выполненную задачу нельзя изменить");

                        return false;

                    }

                    return true;
                    break;
            }
        }
    
        if (action === "remove"){
            if (data.status == "Создано") {
                tasksTab.deleteTask(idOfTaskClicked);
                return true;
            } else {
                webix.message("Нельзя удалить назначенное задание");
                return false;
            }
        }
        $$("kanban").refresh(data.id);
    });

    //Обрабатываем изменение сотрудника, 
    //разрешаем изменять сотрудника только в колонке Создано
    $$("kanban").getUserList().attachEvent("onBeforeSelect", function (id, selection) {
        let status = $$("kanban").getItem(idOfTaskClicked).status;

        if (status != "Создано") {
            return false;
        }

    })

    //Если меняем сотрудника в колонке Создано,
    //то сразу перемещаем его в колонку Назначено
    $$("kanban").getUserList().attachEvent("onAfterSelect", function (assignedId) {

        let status = $$("kanban").getItem(idOfTaskClicked).status;
       
        if (status == "Создано") {
            $$("kanban").getItem(idOfTaskClicked).status = "Назначено";
            $$("kanban").updateItem(idOfTaskClicked);
        }

        tasksTab.updateTask(taskClicked, null, null, null, taskClicked.getId(),
            null, null, "Назначено", null, assignedId.replace("userListEmployee", ""));
    })


    function start() {  
        projectsTab.show();
    }

    start();
});

let arrayOfScripts = [
    "./public/js/src/models/EmployeesModel.js",
    "./public/js/src/models/ProjectsModel.js",
    "./public/js/src/models/TasksModel.js",
    "./public/js/src/entities/Task.js",
    "./public/js/src/entities/Employee.js",
    "./public/js/src/entities/Project.js",
    "./public/js/src/controllers/EmployeesTab.js",
    "./public/js/src/controllers/ProjectsTab.js",
    "./public/js/src/controllers/TasksTab.js",
    "./public/js/src/views/EmployeesView.js",
    "./public/js/src/views/ProjectView.js",
    "./public/js/src/views/TasksView.js",
    "./public/js/src/views/LoginView.js",
    "./public/js/src/controllers/LoginTab.js",
];

let loadScript = function(src) {
    let script = document.createElement('script');
    script.src = src;
    script.async = false;

    let head = document.head;
    head.appendChild(script);
}

//Эта конструкция гарантирует загрузку всех скриптов
//до начала выполнения основного(этого) скрипта
arrayOfScripts.forEach(function(item, index, array) {
    if (index < array.length - 1) {
        loadScript(item);
    } else {
        let script = document.createElement('script');
        script.src = item;
        script.async = false;   

        script.onreadystatechange = webixReady;
        script.onload = webixReady;

        let head = document.head;
        head.appendChild(script);
    }
});
