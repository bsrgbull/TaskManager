package mappers

import (
	"fmt"
	"taskmanager/app"
	"taskmanager/app/entities"
)

type MProject struct {
}

//Возвращает все проекты в виде объектов Project
func (m MProject) GetAllProjects() ([]*entities.Project, error) {

	rows, err := app.DB.Query("select * from projects")

	if err != nil {
		return nil, err
	}

	defer rows.Close()
	projects := []*entities.Project{}

	for rows.Next() {
		i := entities.Project{}
		err := rows.Scan(&i.Name, &i.CreatorId, &i.Id, &i.AimOfTheProject)

		if err != nil {
			fmt.Println(err)
			continue
		}
		projects = append(projects, &i)
	}

	return projects, err
}

//Возвращает проект в виде объекта Project
func (m MProject) GetProject(id int) (*entities.Project, error) {

	row, err := app.DB.Query("SELECT id, name, creatorid, aimOfTheProject FROM projects WHERE id = $1", id)

	defer row.Close()
	if err != nil { //insert into projects (id, name, creatorid, aimOfTheProject) values ('project1','Создание TaskManager','employee1','Разработать Task Manager - программу для управления проектами небольших групп людей. Это инструмент, который позволяет разработчикам вести учет задач проекта, планировать и отслеживать процесс выполнения. Требования: учёт проектов; учёт задач; учёт сотрудников; логика состояний для задач. Под учётом подразумеваются CRUD операции. Технологии, которые необходимо использовать: для фронтэнда - Webix, для бэкэнда: Revel');
		fmt.Println(err)
		return nil, err
	}

	row.Next()
	i := entities.Project{}
	err = row.Scan(&i.Id, &i.Name, &i.CreatorId, &i.AimOfTheProject)

	if err != nil {
		fmt.Println(err)
	}

	fmt.Println(i.Id)

	return &i, err

}

//Создаёт новый проект, либо, если он уже есть, обновляет
func (m MProject) AddOrUpdateProject(proj *entities.Project) error {

	//Проверка на существование записи в базе
	row, err := app.DB.Query("SELECT * FROM projects WHERE id = $1", proj.Id)
	defer row.Close()
	row.Next()
	i := entities.Project{}
	err = row.Scan(&i.Id, &i.Name, &i.CreatorId, &i.AimOfTheProject)

	if i.Id == 0 {
		//Если записи нет, создаём новую
		_, err = app.DB.Exec("insert into projects (id, name, creatorId, aimOfTheProject) values ($1, $2, $3, $4)",
			proj.Id, proj.Name, proj.CreatorId, proj.AimOfTheProject)

		return err
	}

	//Если запись есть обновляем её
	_, err = app.DB.Exec("update projects set name = $2, creatorId = $3, aimOfTheProject = $4 where id = $5",
		proj.Name, proj.CreatorId, proj.AimOfTheProject, proj.Id)

	if err != nil {
		panic(err) //!!!
	}

	return err	
}

//Удаляет проект
func (m MProject) DeleteProject(id int) error {

	_, err := app.DB.Exec("DELETE FROM projects WHERE id = $1", id)
	if err != nil {
		panic(err)
	}

	return err
}
