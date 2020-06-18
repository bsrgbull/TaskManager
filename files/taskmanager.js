webix.ready(function () {
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
                        { id:"myProjectsButton", view: "button",  label: "Мои проекты", width: 150},
                        { id:"employeesButton", view: "button",  label: "Сотрудники", width: 150},
                        { id:"addTaskButton", view: "button",  label: "+", width: 50, hidden:true},
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
                    view:"kanban",
                    cols:[
                        { header:"Назначено", body:{ view:"kanbanlist", status:"new"} },
                        { header:"В работе", body:{ view:"kanbanlist", status:"work"} },
                        { header:"Решено", body:{ view:"kanbanlist", status:"solved"} }
                    ],
                    editor:true,    
                    data:[
                        { id:1, status:"new", text:"Задача №1"},
                        { id:2, status:"new", text:"Задача №2"},
                        { id:3, status:"new", text:"Задача №3"},
                        { id:4, status:"new", text:"Задача №4"},
                        { id:5, status:"new", text:"Задача №5"},
                        { id:6, status:"work", user_id: 5, text:"Задача №6"},
                        { id:7, status:"work", user_id: 5, text:"Задача №7"},
                        { id:8, status:"work", user_id: 5, text:"Задача №8"},
                        { id:9, status:"solved", user_id: 5, text:"Задача №9"},
                        { id:10, status:"solved", user_id: 5, text:"Задача №10"},
                        { id:11, status:"solved", user_id: 5, text:"Задача №11"},
                        { id:12, status:"solved", user_id: 5, text:"Задача №12"},
                    ]
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
                        {
                            view:"button", 
                            id:"invite", 
                            value:"Пригласить", 
                            inputWidth:180 
                        },
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
                            { view:"text", label:"Название", hidden:true},
			                { margin:5, hidden:true, cols:[
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
//    showProjectPage();
//    showEmployeesPage();
    showTaskPage();
});


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