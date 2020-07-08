package mappers

import (
	"fmt"
	"taskmanager/app"
	"taskmanager/app/entities"
)

type MProject struct {
}

//Создаёт новый проект
func (m *MProject) AddProject(newProject *entities.Project) (int, error) {
	fmt.Println(newProject)
	var maxId int = 0

	for _, project := range app.MapOfProjects {
		if project.Id > maxId {
			maxId = project.Id
		}
	}

	newProject.Id = maxId + 1

	app.MapOfProjects[maxId+1] = newProject

	var err error = nil

	return maxId + 1, err
}

//Возвращает все проекты в виде объектов Project
func (m *MProject) GetAllProjects() ([]*entities.Project, error) {

	projects := []*entities.Project{}
	var err error = nil

	for _, pr := range app.MapOfProjects {
		projects = append(projects, pr)
	}

	return projects, err
}

//Возвращает проект в виде объекта Project
func (m *MProject) GetProject(id int) (*entities.Project, error) {

	var i *entities.Project
	var err error = nil

	i = app.MapOfProjects[id]

	return i, err

}

func (m *MProject) UpdateProject(proj *entities.Project) error {

	app.MapOfProjects[proj.Id] = proj

	return nil
}

//Удаляет проект
func (m *MProject) DeleteProject(id int) error {

	delete(app.MapOfProjects, id)
	var err error = nil

	return err
}
