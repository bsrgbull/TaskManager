package providers

import (
	"taskmanager/app/entities"
	"taskmanager/app/mappers"
)

type PProject struct {
	m mappers.MProject
}

func (p *PProject) AddProject(newProject *entities.Project) (int, error) {

	return p.m.AddProject(newProject)
}

//Возвращает все проекты в виде массива объектов и ошибку
func (p *PProject) GetAllProjects() ([]*entities.Project, error) {

	return p.m.GetAllProjects()
}

//Возвращает проект в виде объекта, и ошибку
func (p *PProject) GetProject(id int) (*entities.Project, error) {

	return p.m.GetProject(id)
}

func (p *PProject) UpdateProject(newProject *entities.Project) error {

	return p.m.UpdateProject(newProject)
}

func (p *PProject) DeleteProject(id int) error {

	return p.m.DeleteProject(id)
}

func (p *PProject) AddEmployee(employeeId int, projectId int) error {

	return p.m.AddEmployee(employeeId, projectId)
}

func (p *PProject) DeleteEmployee(employeeId int, projectId int) error {

	return p.m.DeleteEmployee(employeeId, projectId)
}
