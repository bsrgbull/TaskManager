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

        if (status != "Назначено"){
            return false;
        } else {
            $$("kanban").getItem(context.start).user_id = null;
            $$("kanban").updateItem(context.start);
            taskClicked.setStatus("Создано");
            return true;
        }
    }

    //Обработка drop в kabanlist2
    let dropHandler2 = function(context, e) {
        let task = $$("kanban").getItem(context.start);

        if (task.status != "Создано" || (task.user_id != undefined 
            && task.user_id != null 
            && task.user_id != "" )) {

            return false;

        } else {
            taskClicked.setStatus("Назначено");
            return true;
        }
    }

    //Обработка drop в kabanlist3
    let dropHandler3 = function(context, e) {
        let status = $$("kanban").getItem(context.start).status;
        
        let estimatedTime = taskClicked.getEstimatedTime();

        if ( status == "Создано" || estimatedTime == "" 
            || estimatedTime == undefined || estimatedTime == null 
            || estimatedTime == 0){

            return false;

        } else {
            taskClicked.setStatus("В работе");
            return true;
        }
    }

    //Обработка drop в kabanlist4
    let dropHandler4 = function(context, e) {
        let status = $$("kanban").getItem(context.start).status;

        let spentTime = taskClicked.getSpentTime();

        if (status == "Создано"  || status == "Назначено" 
            || spentTime == ""   || spentTime == undefined 
            || spentTime == null || spentTime == 0){

            return false;

        } else {
            taskClicked.setStatus("Завершено");
            return true;
        }
    }  

    //Обработчик кнопки Добавить в проект
    let addEmployeeHandler = function(id,event){
        ////////////////////////////////////////////
   // let ifLogin = loginTab.getLoginView().showLoginPage();
   ////////////////////////////////////////////////
///////////////////////////////////////// GET
/*      let xhr = new XMLHttpRequest();

        xhr.open('GET', 'http://localhost:9000/employee', false);
        xhr.send();

        if (xhr.status != 200) {
            // обработать ошибку
            alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
        } else {
            let value = JSON.parse(xhr.responseText);
            alert(value.employee[0].email);
        }*/
////////////////////////////////////////////        
/////////////////////////////////////////////// POST

////////////////////////////////////////////////
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
                                let mapOfTasks = tasksTab.getTasksFromProject(currentProject.getId());
                                let mapOfEmployees = employeesTab.getEmployeesFromArray(
                                    currentProject.getArrayOfEmployeesId());
                                    
                                tasksTab.showTaskPage(mapOfTasks, mapOfEmployees);
                                $$("modalWindowForAddingEmployeesToProject").close();
                            }
                        } },
                        { view: "button", value: "Отмена", click:function(id,event){
                            $$("modalWindowForAddingEmployeesToProject").close();
                        } }
                    ]},
                ]
            },
        }).show()

        tasksTab.getTasksView().addEmployeesInModalWindow(employeesTab.getEmployeesModel(), currentProject);
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

            if (name == "" || surname == "" || password == "") {
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
                      click:function(){ $$('modalWindowForEmployees').close(); }}
                ]
            },
            width: 500,
            height: 500,
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
                    { id:"modalEmployeeLogin", view: "text", label: 'Логин', name: "login" },
                    { id:"modalEmployeePassword", view: "text", label: 'Пароль*', name: "password" },
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

                let employee = employeesTab.getEmployee($$("employeesTable").getSelectedId());

                $$("addOrChangeForm").setValues({ name:employee.getName(),
                                                  surname:employee.getSurname(),
                                                  email:employee.getEmail(),
                                                  login:employee.getLogin(),
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

////////////////////////////////////////////////////////////////////        

let xhr = new XMLHttpRequest();

        xhr.open("DELETE", 'http://localhost:9000/employee/employee15')
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.send();

////////////////////////////////////////////////////////////////////

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

    //Обработчик кнопки Новый проект
    let addProjectHandler = function(id, event) {
        //Удаляет предыдущее окно, если оно создавалось
        if ($$("modalWindowForProjects")) {
            $$("modalWindowForProjects").close();
        } 

        webix.ui({
            id:"modalWindowForProjects",
            view:"window",
            head:"Новый проект:",
            width: 500,
            height: 300,
            modal:true,
            close:true,
            position: "center",
            body: {
                view: "form",
                elements: [
                    { id:"modalProjectName", view: "text", label: 'Название*', name: "name" },
                    { id:"modalProjectAim", view: "text", label: 'Цель проекта', name: "aim" },
                    { template:"* поле обязательно для заполнения" },
                    { cols:[
                        { view: "button", value: "Добавить", click:function(id,event){
                            let name = $$("modalProjectName").getValue();
                            let aim = $$("modalProjectAim").getValue();
                            if (name == "") {
                                return;
                            }

                            projectsTab.addNewProject(name, 1, aim,[1]);

                            $$("modalWindowForProjects").close();
                        } },
                        { view: "button", value: "Отмена", click:function(id,event){
                            $$("modalWindowForProjects").close();
                        } }
                    ]},
                ],
                elementsConfig: {
                    labelPosition: "top",
                }
              },
          }).show()
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

                            tasksTab.addNewTask(text, 1, currentProject.getId() );
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
    let openProjectHandler = function(id, event) {
        if ($$("projectsList").getSelectedId() != "" ){

            currentProject = projectsTab.getProject(Number($$("projectsList").getSelectedId() ) );

            let mapOfTasks = tasksTab.getTasksFromProject($$("projectsList").getSelectedId());
            let mapOfEmployees = employeesTab.getEmployeesFromArray(currentProject.getArrayOfEmployeesId());

            tasksTab.showTaskPage(mapOfTasks, mapOfEmployees);
            $$("projectName").define("template", currentProject.getName());
            $$("projectName").refresh();
        }
    }
    
    let tryToLogin = function (id) {
        
        loginTab.login($$("userLogin").getValue(), $$("userPassword").getValue(), employeesTab.getEmployeesModel());

    }

    //Изменение списка сотрудников в зависимости от статуса карточки
    function changeUserList(id) {
        $$("kanban").getUsers().clearAll();

        if ($$("kanban").getItem(id).status != "Создано") { 

            tasksTab.getTasksView().addEmployeeInList(employeesTab.getEmployee((
                taskClicked.getAssignedToId() ) ) );
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
                        onListIconClick: function(id, itemId){
                            idOfTaskClicked = itemId;
                            taskClicked = tasksTab.getTask(itemId);
                            changeUserList(itemId);
                        },
                        onListItemClick: function(id,ev,node,list){
                            idOfTaskClicked = id;
                            taskClicked = tasksTab.getTask(id);
                            changeUserList(id);
                        },
                        /*onAvatarClick: function(id){
                            if ($$("kanban").getItem(id).status == "Завершено") {

                            }
                            idOfTaskClicked = id;
                            changeUserList(id);
//                            return avatarClickHandler($$("kanban").getItem(id).status);
                        },*/
                        onBeforeEditorShow:(editor,obj) => {

                        	$$("userListInEditor").getList().clearAll();

                        	let statusList = $$("status").getList();
                        	statusList.parse($$("kanban").getStatuses());

                        	let arrayOfEmployeesId = currentProject.getArrayOfEmployeesId();

                        	if (obj.status != "Создано") {
                        		let emp = employeesTab.getEmployee(taskClicked.getAssignedToId())
                        		$$("userListInEditor").getList().add({
            							id: emp.getId(),
            							value: emp.getSurnameAndName(),
        							});
                        	} else {

                                for (let id of arrayOfEmployeesId) {
                                    $$("userListInEditor").getList().add({
            							id: id,
                                        value: employeesTab.getEmployee(id).getSurnameAndName(),
                                    });
                                }
                            }

            				$$("userListInEditor").define({ value:taskClicked.getAssignedToId()});
            				$$("userListInEditor").refresh();

            				$$("estimatedTime").setValue(Number(taskClicked.getEstimatedTime()));
                            $$("spentTime").setValue(Number(taskClicked.getSpentTime()));
                            $$("priority").setValue(taskClicked.getColor());
                        },
                      },
                    cols:[
                        { header:"Создано", body:{ id:"kanbanlist1", view:"kanbanlist",
                          status:"Создано", on:{ onBeforeDrop:dropHandler1,},} },
                        { header:"Назначено", body:{ id:"kanbanlist2", view:"kanbanlist",
                          status:"Назначено", on:{ onBeforeDrop:dropHandler2},} },
                        { header:"В работе", body:{ id:"kanbanlist3", view:"kanbanlist",
                          status:"В работе", on:{ onBeforeDrop:dropHandler3},} },
                        { header:"Завершено", body:{ id:"kanbanlist4", view:"mykanbanlistsolved",
                          status:"Завершено", on:{ onBeforeDrop:dropHandler4}, } 
                        }
                    ],
                  //  colors:colors,
                    editor:[    
                        { cols:[
                            { rows:[
                                { id: "estimatedTime", view:"counter", inputAlign:"right", name:"time", step:Number(1,25), label:"Оценка времени" },
                                { id: "spentTime", view:"counter", inputAlign:"right", name:"time", step:Number(1,25), value: 68, label:"Время, ч" },
                                { view:"counter", name:"time", hidden:true },
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
                            { view:"richselect", name:"color", hidden:true},
                            { id: "status", view:"richselect", name:"$list", label:"Статус", options:[] }     
                        ]},
                    ],//true,
                    comments:false, 
                 //   userList:true, 
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
                        { view:"button", value:"Новый проект", width:150, align:"left",
                        css:"webix_primary", click:addProjectHandler},
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
                                        $$("projectInfo").define("template", projectsTab.getProjectInfo(employeesTab, id) );
                                        $$("projectInfo").refresh();
                                    },
                                 },
                            },
                        ], height:1000},
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
        /*for (var key in $$("kanban").getItem(idOfTaskClicked)) {
            // этот код будет вызван для каждого свойства объекта
            // ..и выведет имя свойства и его значение
          
            alert( "Ключ: " + key + " значение: " + $$("kanban").getItem(idOfTaskClicked)[key] );
          }*/

        let dataUserId = $$("userListInEditor").data.value;

        if (action === "save"){          

            switch (data.status) {

                case "Создано":

                	if (data.$list == 3 || data.$list == 2 ) {
                        return false;
                    } else {    
                        if (data.$list == 1 && (dataUserId == undefined 
                            || dataUserId == null || dataUserId == "" ) ) {
                            return false;
                        }
                        if ($$("spentTime").getValue() != taskClicked.getSpentTime()) {
                            alert("Итоговое время можно менять только у задач в работе");
                            return false;
                        }

                        //Если назначается Сотрудник, то перемещаем его сразу в колонку 2
                        if (dataUserId != taskClicked.getAssignedToId()
                        && dataUserId != undefined && dataUserId != null && dataUserId != "") {
                            data.$list = 1;            
                            taskClicked.setAssignedToId(dataUserId);
                            taskClicked.setStatus("Назначено");                          
                        }
                        taskClicked.setText(data.text);  
                        taskClicked.setEstimatedTime($$("estimatedTime").getValue());
                        taskClicked.setColor($$("priority").getValue());

                        $$("kanban").getItem(idOfTaskClicked).color = $$("priority").getValue();

                        return true;
                    }
                    break;
                
                case "Назначено":

                    if (data.$list == 3) {

                        return false;

                    } else {    

                        if ($$("spentTime").getValue() != taskClicked.getSpentTime()) {
                            alert("Итоговое время можно менять только у задач в работе");
                            return false;
                        }

                        if (data.$list == 0 ) {

                            dataUserId = null;  //Если перемещаем в Создано, то удаляем Сотрудника
                            taskClicked.deleteAssignedToId();
                            taskClicked.setStatus("Создано");
                            taskClicked.setText(data.text);
                            taskClicked.setEstimatedTime($$("estimatedTime").getValue());
                            taskClicked.setColor($$("priority").getValue());
                        
                            $$("kanban").getItem(idOfTaskClicked).color = $$("priority").getValue();

                            return true;

                        } else if (dataUserId != taskClicked.getAssignedToId() ||
                        data.text != $$("kanban").getItem(data.id).text) {

                            alert("Нельзя изменять назначенное задание");
                            return false;

                        }
                        if (data.$list == 2) {

                            if ($$("estimatedTime").getValue() == "" || $$("estimatedTime").getValue() == undefined ||
                                $$("estimatedTime").getValue() == null ) {
                                alert("Оцените время выполнения задачи, перед сменой статуса");;
                                return false;
                            }
                            
                            tasksTab.getTask(data.id).setStatus("В работе");
                    	}
                        taskClicked.setColor($$("priority").getValue());
                        taskClicked.setEstimatedTime($$("estimatedTime").getValue());

                        $$("kanban").getItem(idOfTaskClicked).color = $$("priority").getValue();

                        return true;
                    }

                    break;

                case "В работе":

                    if (data.$list == 0 || data.$list == 1 
                    || dataUserId != taskClicked.getAssignedToId() 
                    || data.text != $$("kanban").getItem(data.id).text 
                    || $$("estimatedTime").getValue() != taskClicked.getEstimatedTime()) {

                    	alert("Нельзя изменять задание c этим статусом");

                        return false;   //Запрет на изменение

                    } else if (data.$list == 3) {

                        if ( $$("spentTime").getValue() != "" 
                             && $$("spentTime").getValue() != undefined 
                             && $$("spentTime").getValue() != null 
                             && $$("spentTime").getValue() != 0) {    
                                
                            taskClicked.setStatus("Завершено");

                        } else {
                            alert("Укажите время, потраченное на выполнение задачи");
                            return false;
                        }
                    }
                    taskClicked.setColor($$("priority").getValue());
                    taskClicked.setSpentTime($$("spentTime").getValue());

                    $$("kanban").getItem(idOfTaskClicked).color = $$("priority").getValue();

                    return true;
                    taskClicked.setColor($$("color").getValue());
                    break;

                case "Завершено":

                    return false;
                    break;
            }
        }
    
        if (action === "remove"){
            if (data.status == "Создано") {
                tasksTab.deleteTask(idOfTaskClicked);
                return true;
            } else {
                alert("Нельзя удалить назначенное задание");
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
    $$("kanban").getUserList().attachEvent("onAfterSelect", function (id) {

        let status = $$("kanban").getItem(idOfTaskClicked).status;
       
        if (status == "Создано") {
            $$("kanban").getItem(idOfTaskClicked).status = "Назначено";
            $$("kanban").updateItem(idOfTaskClicked);
        }
        taskClicked.setAssignedToId(id);
        taskClicked.setStatus("Назначено");
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
