package app

import (
	"database/sql"
	"fmt"

	"github.com/revel/revel"

	//database
	_ "github.com/lib/pq"
)

var DB *sql.DB

var (
	// AppVersion revel app version (ldflags)
	AppVersion string

	// BuildTime revel app build-time (ldflags)
	BuildTime string
)

func InitDB() {
	connStr := "user=postgres password=12348765 dbname=taskManagerDB sslmode=disable"
	//connStr := "user=postgres password=12348765 dbname=postgres sslmode=disable"
	var err error
	DB, err = sql.Open("postgres", connStr)

	if err != nil {
		panic(err)
		//fmt.Println("DB Error", err)
		//		revel.INFO.Println("DB Error", err)
	}
	fmt.Println("DB Connected")
	//	revel.INFO.Println("DB Connected")

	/*	/////////////////////////////////////////////////////////////

		//Карта сотрудников
		MapOfEmployees = make(map[int]*entities.Employee)
		MapOfEmployees[1] = &entities.Employee{Name: "Сергей", Surname: "Быков", Login: "bsrgbull", Email: "bsrg.bull@gmail.com", Password: "123", Id: 1}
		MapOfEmployees[2] = &entities.Employee{Name: "Игорь", Surname: "Коваценко", Login: "nickname", Email: "kovacenko@gmail.com", Password: "123", Id: 2}
		MapOfEmployees[3] = &entities.Employee{Name: "Леонид", Surname: "Самойлов", Login: "nickname", Email: "samoilov@gmail.com", Password: "123", Id: 3}
		MapOfEmployees[4] = &entities.Employee{Name: "Артём", Surname: "Юдаев", Login: "nickname", Email: "yudaev@gmail.com", Password: "123", Id: 4}
		MapOfEmployees[5] = &entities.Employee{Name: "Дмитрий", Surname: "Кудрявцев", Login: "nickname", Email: "kudryavcev@gmail.com", Password: "123", Id: 5}
		MapOfEmployees[6] = &entities.Employee{Name: "Вадим", Surname: "Сафонов", Login: "nickname", Email: "safonov@gmail.com", Password: "123", Id: 6}
		MapOfEmployees[7] = &entities.Employee{Name: "Алёна", Surname: "Фадеева", Login: "nickname", Email: "fadeeva@gmail.com", Password: "123", Id: 7}
		MapOfEmployees[8] = &entities.Employee{Name: "Виктор", Surname: "Блинов", Login: "nickname", Email: "blinov@gmail.com", Password: "123", Id: 8}
		MapOfEmployees[9] = &entities.Employee{Name: "Роман", Surname: "Ефимов", Login: "nickname", Email: "efimov@gmail.com", Password: "123", Id: 9}
		MapOfEmployees[10] = &entities.Employee{Name: "Валерия", Surname: "Мартынова", Login: "nickname", Email: "martinova@gmail.com", Password: "123", Id: 10}
		MapOfEmployees[11] = &entities.Employee{Name: "Константин", Surname: "Корнилов", Login: "nickname", Email: "kornilov@gmail.com", Password: "123", Id: 11}
		MapOfEmployees[12] = &entities.Employee{Name: "Никита", Surname: "Зимин", Login: "nickname", Email: "zimin@gmail.com", Password: "123", Id: 12}
		MapOfEmployees[13] = &entities.Employee{Name: "Максим", Surname: "Коновалов", Login: "nickname", Email: "konovalov@gmail.com", Password: "123", Id: 13}

		//Карта проектов
		MapOfProjects = make(map[int]*entities.Project)
		MapOfProjects[1] = &entities.Project{Id: 1, Name: "Создание TaskManager", CreatorId: 1, AimOfTheProject: "Разработать Task Manager - программу для управления проектами небольших групп людей. Это инструмент, который позволяет разработчикам вести учет задач проекта, планировать и отслеживать процесс выполнения. Требования: учёт проектов; учёт задач; учёт сотрудников; логика состояний для задач. Под учётом подразумеваются CRUD операции. Технологии, которые необходимо использовать: для фронтэнда - Webix, для бэкэнда: Revel", ArrayOfEmployeesId: []int{1, 2, 3, 4}}
		MapOfProjects[2] = &entities.Project{Id: 2, Name: "HTTP-сервер", CreatorId: 1, AimOfTheProject: "", ArrayOfEmployeesId: []int{1, 5, 6, 7, 8}}
		MapOfProjects[3] = &entities.Project{Id: 3, Name: "Редактор видео", CreatorId: 1, AimOfTheProject: "", ArrayOfEmployeesId: []int{1, 9, 10}}
		MapOfProjects[4] = &entities.Project{Id: 4, Name: "CDMA-шифрование", CreatorId: 1, AimOfTheProject: "", ArrayOfEmployeesId: []int{1}}

		//Карта задач
		MapOfTasks = make(map[int]*entities.Task)
		MapOfTasks[1] = &entities.Task{Text: "Создание макета", EstimatedTime: 2, SpentTime: 3, Id: 1, Status: "Завершено", Colour: "", CreatorId: 1, AssignedToId: 1, ProjectId: 1}
		MapOfTasks[2] = &entities.Task{Text: "Создание UML-диаграммы классов", EstimatedTime: 1, SpentTime: 1, Id: 2, Status: "Завершено", Colour: "green", CreatorId: 1, AssignedToId: 2, ProjectId: 1}
		MapOfTasks[3] = &entities.Task{Text: "Создание интерфейса при помощи Webix", EstimatedTime: 2, SpentTime: 1.5, Id: 3, Status: "Завершено", Colour: "", CreatorId: 1, AssignedToId: 3, ProjectId: 1}
		MapOfTasks[4] = &entities.Task{Text: "Осуществление загрузки данных из объектов", EstimatedTime: 1, SpentTime: 0.75, Id: 4, Status: "Завершено", Colour: "", CreatorId: 1, AssignedToId: 4, ProjectId: 1}
		MapOfTasks[5] = &entities.Task{Text: "Список сотрудников", EstimatedTime: 1, SpentTime: 0, Id: 5, Status: "В работе", Colour: "red", CreatorId: 1, AssignedToId: 1, ProjectId: 1}
		MapOfTasks[6] = &entities.Task{Text: "Список проектов", EstimatedTime: 1, SpentTime: 0, Id: 6, Status: "В работе", Colour: "green", CreatorId: 1, AssignedToId: 1, ProjectId: 1}
		MapOfTasks[7] = &entities.Task{Text: "Модальное окно для работы с сотрудниками", EstimatedTime: 1.5, SpentTime: 0, Id: 7, Status: "Назначено", Colour: "", CreatorId: 1, AssignedToId: 1, ProjectId: 1}
		MapOfTasks[8] = &entities.Task{Text: "Поменять виджет с сотрудниками на DataTable", EstimatedTime: 1, SpentTime: 0, Id: 8, Status: "Назначено", Colour: "red", CreatorId: 1, AssignedToId: 1, ProjectId: 1}
		MapOfTasks[9] = &entities.Task{Text: "Логика добавления/удаления сотрудников", EstimatedTime: 0, SpentTime: 0, Id: 9, Status: "Создано", Colour: "", CreatorId: 1, AssignedToId: 0, ProjectId: 1}
		MapOfTasks[10] = &entities.Task{Text: "Логика добавления/удаления проектов", EstimatedTime: 0, SpentTime: 0, Id: 10, Status: "Создано", Colour: "orange", CreatorId: 1, AssignedToId: 0, ProjectId: 1}
		MapOfTasks[11] = &entities.Task{Text: "Добавление сотрудников в проект", EstimatedTime: 1, SpentTime: 0, Id: 11, Status: "Создано", Colour: "green", CreatorId: 1, AssignedToId: 0, ProjectId: 1}
		MapOfTasks[12] = &entities.Task{Text: "Логика открывания проекта", EstimatedTime: 0, SpentTime: 0, Id: 12, Status: "Создано", Colour: "", CreatorId: 1, AssignedToId: 0, ProjectId: 1}
		MapOfTasks[13] = &entities.Task{Text: "Логика информации о проекте", EstimatedTime: 0, SpentTime: 0, Id: 13, Status: "Создано", Colour: "green", CreatorId: 1, AssignedToId: 0, ProjectId: 1}

		///////////////////////////////////////////////////////////////*/
}

/*//////////
var MapOfEmployees map[int]*entities.Employee
var MapOfProjects map[int]*entities.Project
var MapOfTasks map[int]*entities.Task

////////////*/

func init() {
	// Filters is the default set of global filters.
	revel.Filters = []revel.Filter{
		revel.PanicFilter,             // Recover from panics and display an error page instead.
		revel.RouterFilter,            // Use the routing table to select the right Action
		revel.FilterConfiguringFilter, // A hook for adding or removing per-Action filters.
		revel.ParamsFilter,            // Parse parameters into Controller.Params.
		revel.SessionFilter,           // Restore and write the session cookie.
		revel.FlashFilter,             // Restore and write the flash cookie.
		revel.ValidationFilter,        // Restore kept validation errors and save new ones from cookie.
		revel.I18nFilter,              // Resolve the requested language
		HeaderFilter,                  // Add some security based headers
		revel.InterceptorFilter,       // Run interceptors around the action.
		revel.CompressFilter,          // Compress the result.
		revel.BeforeAfterFilter,       // Call the before and after filter functions
		revel.ActionInvoker,           // Invoke the action.
	}

	// Register startup functions with OnAppStart
	// revel.DevMode and revel.RunMode only work inside of OnAppStart. See Example Startup Script
	// ( order dependent )
	// revel.OnAppStart(ExampleStartupScript)
	revel.OnAppStart(InitDB)
	// revel.OnAppStart(FillCache)
	//controllers.App.start()
}

// HeaderFilter adds common security headers
// There is a full implementation of a CSRF filter in
// https://github.com/revel/modules/tree/master/csrf
var HeaderFilter = func(c *revel.Controller, fc []revel.Filter) {
	c.Response.Out.Header().Add("X-Frame-Options", "SAMEORIGIN")
	c.Response.Out.Header().Add("X-XSS-Protection", "1; mode=block")
	c.Response.Out.Header().Add("X-Content-Type-Options", "nosniff")
	c.Response.Out.Header().Add("Referrer-Policy", "strict-origin-when-cross-origin")

	fc[0](c, fc[1:]) // Execute the next filter stage.
}

//func ExampleStartupScript() {
//	// revel.DevMod and revel.RunMode work here
//	// Use this script to check for dev mode and set dev/prod startup scripts here!
//	if revel.DevMode == true {
//		// Dev mode
//	}
//}
