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
                    {},
                    {},
                    {},
                    {},
                    { view: "button", type: "form", label: "Войти", width: 150},
                    { view: "button", type: "form",  label: "Зарегистрироваться", width: 200},
                ]
            },
            { 
                view:"label", 
                label:"<span class='myClass'>Task Manager</span>",
   //             inputWidth:300, 
                align:"center",
                height:"300",
                css:"myClass"               
            },
        ]
    });
});