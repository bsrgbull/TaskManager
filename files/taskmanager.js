webix.ready(function () {
    webix.ui({
        rows:[
            {
                css: "toolbar",
                borderless: true,
                paddingY:7,
                paddingX:10,
                margin: 7,
                cols:[
                    { view: "button",  label: "Мои проекты", width: 150},
                    { view: "button",  label: "+", width: 50},
                    { view: "label", label: "Название текущего проекта"},
                    { view: "search", placeholder:"Поиск..", width: 300},
                    { view: "button", type: "form", label: "Войти", width: 150},
                    { view: "button", type: "form",  label: "Зарегистрироваться", width: 200},
                ]
            },
            {cols:[
                {
                    view:"kanban",
                    cols:[
                        { header:"Назначено", body:{ view:"kanbanlist", status:"new" } },
                        { header:"В работе", body:{ view:"kanbanlist", status:"work" } },
                        { header:"Решено", body:{ view:"kanbanlist", status:"solved" } }
                    ],
                    editor:true,    
                    data:[
                        { id:1, status:"new", text:"Задача №1" },
                        { id:2, status:"new", text:"Задача №2" },
                        { id:3, status:"new", text:"Задача №3" },
                        { id:4, status:"new", text:"Задача №4" },
                        { id:5, status:"new", text:"Задача №5" },
                        { id:6, status:"work", user_id: 5, text:"Задача №6" },
                        { id:7, status:"work", user_id: 5, text:"Задача №7" },
                        { id:8, status:"work", user_id: 5, text:"Задача №8" },
                        { id:9, status:"solved", user_id: 5, text:"Задача №9" },
                        { id:10, status:"solved", user_id: 5, text:"Задача №10" },
                        { id:11, status:"solved", user_id: 5, text:"Задача №11" },
                        { id:12, status:"solved", user_id: 5, text:"Задача №12" },
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
            ]
            },
        ]
    });
});