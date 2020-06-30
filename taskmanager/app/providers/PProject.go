package providers

import (
	"taskmanager/app/entities"
	"taskmanager/app/mappers"
)

type PProject struct {
	m mappers.MProject
}

func (p PProject) Before() {
	p.m = mappers.MProject{}
}

//Возвращает все проекты в виде массива объектов и ошибку
func (p PProject) GetAllProjects() (*[]entities.Project, error) {

	projects, err := p.m.GetAllProjects()

	return projects, err
}

//Возвращает проект в виде объекта, и ошибку
func (p PProject) GetProject(id string) (*entities.Project, error) {

	project, err := p.m.GetProject(id)

	return project, err
}

func (p PProject) AddOrUpdateProject(newProject *entities.Project) error {

	return p.m.AddOrUpdateProject(newProject)
}

func (p PProject) DeleteProject(id string) error {

	return p.m.DeleteProject(id)
}
