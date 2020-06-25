'use strict'

let projectsTab;
let employeesTab;
let projectsModel;
let tasksTab;
let projectView;
let employeesView;

let webixReady = webix.ready(function () {

    projectsTab = new ProjectsTab();
    employeesTab = new EmployeesTab();
    tasksTab = new TasksTab();
    projectsModel = projectsTab.getProjectsModel();
    projectView = projectsTab.getProjectView();
    employeesView = employeesTab.getEmployeesView();

    projectsModel.getProject("project1").addEmployee(employeesTab.getEmployee("employee1"));
    projectsModel.getProject("project1").addEmployee(employeesTab.getEmployee("employee2"));
    projectsModel.getProject("project1").addEmployee(employeesTab.getEmployee("employee3"));
    projectsModel.getProject("project1").addEmployee(employeesTab.getEmployee("employee4"));

    projectsModel.getProject("project2").addEmployee(employeesTab.getEmployee("employee1"));
    projectsModel.getProject("project2").addEmployee(employeesTab.getEmployee("employee5"));
    projectsModel.getProject("project2").addEmployee(employeesTab.getEmployee("employee6"));
    projectsModel.getProject("project2").addEmployee(employeesTab.getEmployee("employee7"));
    projectsModel.getProject("project2").addEmployee(employeesTab.getEmployee("employee8"));

    projectsModel.getProject("project3").addEmployee(employeesTab.getEmployee("employee1"));
    projectsModel.getProject("project3").addEmployee(employeesTab.getEmployee("employee9"));
    projectsModel.getProject("project3").addEmployee(employeesTab.getEmployee("employee10"));

    projectsModel.getProject("project4").addEmployee(employeesTab.getEmployee("employee1"));


    //В этой переменной запоминаем id задачи, по иконке которой нажали
    let idOfTaskClicked;

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
            return true;
        }
    }

    //Обработка drop в kabanlist2
    let dropHandler2 = function(context, e) {
        let task = $$("kanban").getItem(context.start);

        if (task.status != "Создано"){
            return false;
        } else if (task.user_id != undefined && task.user_id != null 
            && task.user_id != "" ) {
            return true;
        } else return false;
    }

    //Обработка drop в kabanlist3
    let dropHandler3 = function(context, e) {
        let status = $$("kanban").getItem(context.start).status;

        if (status == "Создано"){
            return false;
        } else return true;
    }

    //Обработка drop в kabanlist4
    let dropHandler4 = function(context, e) {
        let status = $$("kanban").getItem(context.start).status;

        if (status == "Создано" || status == "Назначено"){
            return false;
        } else return true;
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
                                lastProject.addEmployee(employeesTab.getEmployee(emplId));
                                projectsModel.addEmployeeToProject(lastProject, emplId);
                                tasksTab.showTaskPage(lastProject);
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

        tasksTab.addEmployeesInModalWindow(employeesTab.getEmployeesModel(), lastProject);
    }

    //Обработчик кнопки Добавить сотрудника
    let addEmployee = function(id,event){
        webix.ui({
            id:"modalWindowForEmployees",
            view:"window",
            head:"Новый сотрудник:",
            width: 500,
            height: 500,
            modal:true,
            close:true,
            position: "center",
            body: {
                view: "form",
                elements: [
                    { id:"modalEmployeeName", view: "text", label: 'Имя*', name: "name" },
                    { id:"modalEmployeeSurname", view: "text", label: 'Фамилия*', name: "surname" },
                    { id:"modalEmployeeEmail", view: "text", label: 'Email', name: "email" },
                    { id:"modalEmployeeLogin", view: "text", label: 'Логин', name: "login" },
                    { id:"modalEmployeePassword", view: "text", label: 'Пароль*', name: "password" },
                    { template:"* поле обязательно для заполнения" },
                    { cols:[
                        { view: "button", value: "Добавить", click:function(id,event){
                            let name = $$("modalEmployeeName").getValue();
                            let surname = $$("modalEmployeeSurname").getValue();
                            let email = $$("modalEmployeeEmail").getValue();
                            let login = $$("modalEmployeeLogin").getValue();
                            let password = $$("modalEmployeePassword").getValue();

                            if (name == "" || surname == "" || password == "") {
                                return;
                            }

                            let newEmp = (new Employee(name, surname, password));
                            newEmp.setLogin(login);
                            newEmp.setEmail(email);
                            employeesTab.addEmployee(newEmp);
                            $$("modalWindowForEmployees").close();
                        } },
                        { view: "button", value: "Отмена", click:function(id,event){
                            $$("modalWindowForEmployees").close();
                        } }
                    ]},
                ],
                elementsConfig: {
                  labelPosition: "top",
                }
              },
          }).show()
    }

    //Обработчик кнопки Удалить из проекта
    let deleteEmployeeHandler = function(id, event) {

        let selectedId = $$("listOfEmployees").getSelectedId();

        if (selectedId != "" ) {
            webix.modalbox({
                title:"Вы уверены что хотите удалить сотрудника?",
                buttons:["Да", "Отмена"],
                width:500,
                text:""
            }).then(function(result) {
            let type = "";
            if(result == 0) {
                lastProject.deleteEmployee(selectedId);
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
            empId = $$("employeesTable").getSelectedItem().idOfEmployee;
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
                            let newPr = new Project(name, "employee1");
                            newPr.setAimOfTheProject(aim);
                            newPr.addEmployee(employeesTab.getEmployee("employee1"));
                            projectsTab.addProject(newPr);

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

    //Добавление новой карточки
    let addNewTask = function(id, event) {
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
                            let newTask = new Task(text, "employee1");
                            projectsTab.addTaskToProject(lastProject.getId(), newTask);
                            tasksTab.showTaskPage(lastProject);

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

    //В этой переменной последний открытый проект
    let lastProject;

    //Изменяем заголовок при заходе в проект
    let openProjectHandler = function(id, event) {
        if ($$("projectsList").getSelectedId() != "" ){
            let pr = projectsTab.getProject($$("projectsList").getSelectedId() );
            lastProject = pr;
            tasksTab.showTaskPage(pr);
            $$("projectName").define("template", pr.getName());
            $$("projectName").refresh();
        }
    }
    
    //Изменение списка сотрудников в зависимости от статуса карточки
    function changeUserList(id) {
        $$("kanban").getUsers().clearAll();
        if ($$("kanban").getItem(id).status != "Создано") { 
            tasksTab.addEmployeeInList(employeesTab.getEmployee(lastProject.getTask(idOfTaskClicked).getAssignedToId()));
        } else {
            let mapOfEmployees = lastProject.getMapOfEmployees();

            let addemployeeinlist = tasksTab.addEmployeeInList;

            mapOfEmployees.forEach(function(item, index, array) {
                addemployeeinlist(item);
            });
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
                         label: "Войти", width: 150, hidden:false},
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
                            changeUserList(itemId);
                        },
                        onListItemClick: function(id,ev,node,list){
                            idOfTaskClicked = id;
                            changeUserList(id);
                        },
                        /*onAvatarClick: function(id){
                            if ($$("kanban").getItem(id).status == "Завершено") {

                            }
                            idOfTaskClicked = id;
                            changeUserList(id);
//                            return avatarClickHandler($$("kanban").getItem(id).status);
                        },*/

                        //Запрет открывать editor в завершенном столбце
                       /* onBeforeEditorShow:(editor,obj) => {
                            if (obj.status == "Завершено"){
                                editor.disable();
                                return true;
                            }
                        },*/
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
                    editor:/*/[                                                
                        { view:"text", name:"text", label:"Task" },         
                        { view:"text", name:"tags", label:"Tags" },         
                        { view:"text", name:"color", label:"Line Color" }   
                    ],*/true,
                    comments:true, 
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
                                        $$("projectInfo").define("template", projectsTab.getProject(id).getProjectInfo());
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
                        { view:"button", value:"Добавить", width:150, align:"left",
                         css:"webix_primary", click:addEmployee},
                        { view:"button", value:"Удалить", width:100, align:"left", click:deleteEmployee},
                        ]
                    },
                    {   //Таблица на странице Сотрудники
                        view:"datatable", id:"employeesTable",
                        columns:[
                            { id:"idOfEmployee", hidden:true},
                            { id:"nameOfEmployee",    header:"Имя",              width:200},
                            { id:"surnameOfEmployee",   header:"Фамилия",    width:200},
                            { id:"login",    header:"Логин",      width:200},
                            { id:"email",   header:"email",         width:300}
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
        /*for (var key in data) {
            // этот код будет вызван для каждого свойства объекта
            // ..и выведет имя свойства и его значение
          
            alert( "Ключ: " + key + " значение: " + data[key] );
          }*/
        if (action === "save"){

            switch (data.status) {

                case "Создано":

                    if (data.$list == 3 || data.$list == 2 ) {
                        return false;
                    } else {    
                        if (data.$list == 1 && (data.user_id == undefined 
                            || data.user_id == null || data.user_id == "" ) ) {
                            return false;
                        }
                        //Если назначается Сотрудник, то перемещаем его сразу в колонку 2
                        if (data.user_id != $$("kanban").getItem(data.id).user_id
                        && data.user_id != undefined && data.user_id != null) {
                            data.$list = 1;            
                            lastProject.getTask(data.id).setAssignedToId(data.user_id);
                            lastProject.getTask(data.id).setStatus("Назначено");
                        }
                        return true;
                    }
                    break;
                
                case "Назначено":

                    if (data.$list == 3) {
                        return false;
                    } else {    //Если перемещаем в Создано, то удаляем Сотрудника
                        if (data.$list == 0 ) {
                            data.user_id = null;
                            lastProject.getTask(data.id).deleteAssignedToId();
                        } else if (data.user_id != $$("kanban").getItem(data.id).user_id ||
                        data.text != $$("kanban").getItem(data.id).text) {
                            alert("Нельзя изменять назначенное задание");
                            return false;
                        }
                        return true;
                    }

                    break;

                case "В работе":
                    if (data.$list == 0 || data.$list == 1 ||
                    data.user_id != $$("kanban").getItem(data.id).user_id ||
                    data.text != $$("kanban").getItem(data.id).text) {
                        return false;   //Запрет на изменение Сотрудника
                    } else {
                        return true;
                    }

                    break;

                case "Завершено":

                    return false;
                    break;
            }
        }
    
        if (action === "remove"){
            if (data.status == "Создано") {
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
        lastProject.getTask(idOfTaskClicked).setAssignedToId(id);
        lastProject.getTask(idOfTaskClicked).setStatus("Назначено");
    })

    function start() {  
        projectsTab.show();
    }

    start();
});

let arrayOfScripts = [
    "./src/models/Employee.js",
    "./src/models/EmployeesModel.js",
    "./src/models/Project.js",
    "./src/models/ProjectsModel.js",
    "./src/models/Task.js",
    "./src/controllers/EmployeesTab.js",
    "./src/controllers/ProjectsTab.js",
    "./src/views/EmployeesView.js",
    "./src/views/ProjectView.js",
    "./src/views/TasksTab.js",
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