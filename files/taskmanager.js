'use strict'



webix.ready(function () {

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
            "upload" : "Загрузить"
        },
        "menu":{
            "copy": "Копировать",
            "edit": "Редактировать",
            "remove": "Удалить"
        }
    };
    
    webix.i18n.setLocale("ru-RU");


    //Обработка drop в kabanlist2
    let dropHandler1 = function(context, e) {
        let status = $$("kanban").getItem(context.start).status;

        if (status != "Назначено"){
            return false;
        } else return true;
    }

    //Обработка drop в kabanlist2
    let dropHandler2 = function(context, e) {
        let status = $$("kanban").getItem(context.start).status;

        if (status != "Создано"){
            return false;
        } else return true;
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

    let addTaskHandler = function(iconId, itemId) {
       alert(id);
       return false;
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
                            click:"showProjectPage()", width: 150},
                        { id:"employeesButton", view: "button",  label: "Сотрудники",
                            click:"showEmployeesPage()",width: 150},
                        { id:"addTaskButton", view: "button",  label: "+", width: 50, hidden:true,
                        click:() => { $$("kanban").showEditor();}  },
                        { id:"projectName", view: "label", label: "Название текущего проекта", hidden:true},
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
                          webix.message("Icon '"+iconId+"' has been clicked in '"+this.getItem(itemId).text+"' item")
                        },
                        onListItemClick: function(id,e,node,list){
                            webix.message("Item '"+this.getItem(id).text+"' has been clidcked.");
                        },
                      },
                    cols:[
                        { header:"Создано", body:{ id:"kanbanlist1", view:"kanbanlist",
                          status:"Создано", on:{ onBeforeDrop:dropHandler1, onListIconClick:addTaskHandler
                          /*onAfterAdd:addTaskHandler, onAfterRender:addTaskHandler*/}} },
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
                    data:[
                        { id:"task1", status:"Создано", text:"Задача №1", comments:[
                            { id:"comment6", user_id:4, date:"2018-06-14 23:01", text:"Комментарий"} ] },
                        { id:"task2", status:"Создано", text:"Задача №2"},
                        { id:"task3", status:"Создано", text:"Задача №3"},
                        { id:"task4", status:"Создано", text:"Задача №4"},
                        { id:"task5", status:"Создано", text:"Задача №5"},
                        { id:"task6", status:"В работе", text:"Задача №6"},
                        { id:"task7", status:"В работе", text:"Задача №7"},
                        { id:"task8", status:"В работе", text:"Задача №8"},
                        { id:"task9", status:"Завершено", text:"Задача №9"},
                        { id:"task10", status:"Завершено", text:"Задача №10"},
                        { id:"task11", status:"Завершено", text:"Задача №11"},
                        { id:"task12", status:"Завершено", text:"Задача №12"},
                        { id:"task13", status:"Назначено", text:"Задача №13"},
                        { id:"task14", status:"Назначено", text:"Задача №14"},
                    ],
                    users:[
                        { id:"user1", value:"Margaret Atwood", }
                    ],
                },
                {   
                    rows:[
                        {
                            view:"list",
                            width:180,
                            template:"#title#",
                            select:true,
                            data:[
                                { id:1, title:"Пользователь №1"},
                                { id:2, title:"Пользователь №2"},
                                { id:3, title:"Пользователь №3"},
                                { id:4, title:"Пользователь №4"},
                                { id:5, title:"Пользователь №5"},
                            ]
                        },
                        { id:"deleteEmployee", view:"button", value:"Удалить", inputWidth:180 },
                        { id:"addEmployee", view:"button", value:"Добавить", inputWidth:180 },
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
                        css:"webix_danger", align:"left"},
                        { view:"button", value:"Новый проект", width:150, align:"left",
                        css:"webix_primary"},
                        { view:"button", value:"Удалить", width:100, align:"left"},
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
                                data:[
                                    { id:"pr1", title:"Проект №1"},
                                    { id:"pr2", title:"Проект №2"},
                                    { id:"pr3", title:"Проект №3"},
                                    { id:"pr4", title:"Проект №4"},
                                    { id:"pr5", title:"Проект №5"},
                                ],
                                /*on:{
                                    onItemClick:open_new_tab
                                }*/
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
                         css:"webix_primary"},
                        { view:"button", value:"Удалить", width:100, align:"left"},
                        ]
                    },
                    { cols:[
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
                                data:[
                                    { id:"emp1", title:"Сотрудник №1"},
                                    { id:"emp2", title:"Сотрудник №2"},
                                    { id:"emp3", title:"Сотрудник №3"},
                                    { id:"emp4", title:"Сотрудник №4"},
                                    { id:"emp5", title:"Сотрудник №5"},
                                ],
                                /*on:{
                                    onItemClick:open_new_tab
                                }*/
                            },
                        ]},
                        { type:"clean", rows:[
                            { id:"employeesViews", cells:[
                                { view:"template", id:"emptpl", template:"Информация о сотруднике" },
                            ]}
                        ]}
                    ]}
                ], hidden:true, id:"employeesPage"
            },
        ]
    });
    
    showTaskPage();
    
 //   alert($$("user1"));
 //   $$("kanban").disable();
});

projectTab = new ProjectTab();
employeesTab = new EmployeesTab();
tasksView = new TasksView();

function start() {

}


function showProjectPage() {
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

function showEmployeesPage() {
    $$("toolbarButtonsON").show();
    $$("addTaskButton").hide();
    $$("projectName").hide();
    $$("exitButton").show();
    $$("tasksPage").hide();
    $$("projectPage").hide();
    $$("employeesPage").show();
    $$("taskButtonsOff").hide();
}

function showTaskPage() {
    $$("toolbarButtonsON").show();
    $$("addTaskButton").show();
    $$("projectName").show();
    $$("exitButton").show();
    $$("tasksPage").show();
    $$("projectPage").hide();
    $$("taskButtonsOff").hide();
    $$("loginButton").hide();
    $$("registrationButton").hide();
    $$("startLabel").hide();
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

