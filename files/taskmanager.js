'use strict'



webix.ready(function () {

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
        $$("listOfEmployees").add({
            title: "Сотрудник",
        },0);
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
    let deleteEmployeeHandler = function(id, event) {;
        if ($$("listOfEmployees").getSelectedId() != "" ) {
            webix.modalbox({
                title:"Вы уверены что хотите удалить сотрудника?",
                buttons:["Да", "Отмена"],
                width:500,
                text:""
            }).then(function(result) {
            let type = "";
            if(result == 0) {
                $$("listOfEmployees").remove($$("listOfEmployees").getSelectedId());
                type = "success";
            } else if(result == 1) type = "error";
    
            });
        }
    }

    //Обработчик кнопки Удалить сотрудника
    let deleteEmployee = function(id, event) {
        let empId = $$("employeesTable").getSelectedId();
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

    //Изменяем заголовок при заходе в проект
    let openProjectHandler = function(id, event) {
        if ($$("projectsList").getSelectedId() != "" ){
            let pr = projectsTab.getProject($$("projectsList").getSelectedId() );
            tasksTab.showTaskPage(pr);
            $$("projectName").define("template", pr.getName());
            $$("projectName").refresh();
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
                            click:"projectView.showProjectPage()", width: 150},
                        { id:"employeesButton", view: "button",  label: "Сотрудники",
                            click:"employeesView.showEmployeesPage()",width: 150},
                        { id:"addTaskButton", view: "button",  label: "+", width: 50, hidden:true,
                        click:() => { $$("kanban").showEditor();}  },
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
                        onListIconClick: function(iconId, itemId){
                          webix.message("1Icon '"+iconId+"' has been clicked in '"+this.getItem(itemId).text+"' item")
                        },
                        onAvatarClick: function(id){

                            if ($$("kanban").getItem(id).status == "Завершено") {
                                alert(this.name);

                            }

                            idOfTaskClicked = id;
//                            return avatarClickHandler($$("kanban").getItem(id).status);
                        },
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
                    editor:true,
                    comments:true, 
                    userList:true, 
                    drag:false,
                    users:[
                        { id:"user1", value:"Быков Сергей", },
                        { id:"user2", value:"Margaret Atwood", }
                    ],
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
                            data:[
                                { id:"employee1", title:"Сотрудник №1"},
                                { id:"employee2", title:"Сотрудник №2"},
                                { id:"employee3", title:"Сотрудник №3"},
                                { id:"employee4", title:"Сотрудник №4"},
                                { id:"employee5", title:"Сотрудник №5"},
                            ]
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
                            { view:"list", id:"projectsList",
                                template:"#title#",
                                width: 300,
                                select:true,
                            },
                        ]},
                        { type:"clean", rows:[
                            { id:"projectsViews", cells:[
                                { view:"template", id:"prtpl", template:"Информация о проекте" },
                            ]}
                        ]}
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
    
    //Обработка изменений в editor
    $$("kanban").attachEvent("onBeforeEditorAction",function(action,editor,data){
        /*for (var key in data) {
            // этот код будет вызван для каждого свойства объекта
            // ..и выведет имя свойства и его значение
          
            alert( "Ключ: " + key + " значение: " + data[key] );
          }*/
 //       alert(data.status);
 //       alert(editor.getValues().status);
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
                        } else if (data.user_id != $$("kanban").getItem(data.id).user_id) {
                            return false;
                        }
                        return true;
                    }

                    break;

                case "В работе":

                    if (data.$list == 0 || data.$list == 1 ) {
                        return false;
                    } else {    //Запрет на изменение Сотрудника
                        if (data.user_id != $$("kanban").getItem(data.id).user_id) {
                            return false;
                        }
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

    })


    
//    showTaskPage();
    start();
});


let projectsTab = new ProjectsTab();
let employeesTab = new EmployeesTab();
let projectsModel = projectsTab.getProjectsModel();
let tasksTab = new TasksTab();
let projectView = projectsTab.getProjectView();
let employeesView = employeesTab.getEmployeesView();


function start() {  
    projectView.showProjectPage();

    let projectsMap = projectsModel.getMapOfProjects();

    projectsMap.forEach(function(item, index, array) {
        projectView.addProject(item);
    });

    

}


/*function showStartPage() {
    $$("taskButtonsON").hide();
    $$("exitButton").hide();
    $$("tasksPage").hide();
    $$("projectPage").hide();
    $$("taskButtonsOff").show();
    $$("loginButton").show();
    $$("registrationButton").show();
    $$("startLabel").show();
}*/

