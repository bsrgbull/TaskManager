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

	query := "INSERT INTO projects (name, creator_Id, aimOfTheProject) VALUES ($1, $2, $3) RETURNING id"

	var id int

	err := app.DB.QueryRow(query,
		newProject.Name,
		newProject.CreatorId,
		newProject.AimOfTheProject).Scan(&id)

	return id, err
}

//Возвращает все проекты в виде объектов Project
func (m *MProject) GetAllProjects() ([]*entities.Project, error) {

	query := "SELECT name, aimoftheproject, id, creator_id FROM projects"

	rows, err := app.DB.Query(query)

	if err != nil {
		return nil, err
	}

	projects := []*entities.Project{}

	for rows.Next() {
		i := entities.Project{}
		err := rows.Scan(&i.Name, &i.AimOfTheProject, &i.Id, &i.CreatorId)

		if err != nil {
			fmt.Println(err)
			continue
		}
		projects = append(projects, &i)
	}
	defer rows.Close()

	return projects, err

}

//Возвращает проект в виде объекта Project
func (m *MProject) GetProject(id int) (*entities.Project, error) {

	query := "SELECT name, creator_id, aimOfTheProject, id FROM projects WHERE id = $1"

	row, err := app.DB.Query(query, id)

	if err != nil {
		return nil, err
	}

	defer row.Close()

	row.Next()
	i := entities.Project{}
	err = row.Scan(&i.Name, &i.CreatorId, &i.AimOfTheProject, &i.Id)

	if err != nil {
		fmt.Println(err)
	}

	return &i, err

}

//Обновляет проект
func (m *MProject) UpdateProject(proj *entities.Project) error {

	query := "UPDATE projects SET name = $1, creator_id = $2, aimoftheproject = $3 WHERE id = $4"

	_, err := app.DB.Exec(query,
		proj.Name, proj.CreatorId, proj.AimOfTheProject, proj.Id)

	return err

}

//Удаляет проект
func (m *MProject) DeleteProject(id int) error {

	query := "DELETE FROM projects WHERE id = $1"

	_, err := app.DB.Exec(query, id)
	if err != nil {
		panic(err)
	}

	return err
}

//Добавляет сотрудника в проект
func (m *MProject) AddEmployee(employeeId int, projectId int) error {

	query := "INSERT INTO employees_in_projects (project_id, employee_id) VALUES ($1, $2)"

	_, err := app.DB.Exec(query, projectId, employeeId)

	return err
}

//Удаляет сотрудника из проекта
func (m *MProject) DeleteEmployee(employeeId int, projectId int) error {

	query := "DELETE FROM employees_in_projects WHERE project_id = $1 AND employee_id = $2"

	_, err := app.DB.Exec(query, projectId, employeeId)
	if err != nil {
		panic(err)
	}

	return err
}
