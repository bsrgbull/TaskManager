package mappers

import (
	"fmt"
	"taskmanager/app"
	"taskmanager/app/entities"
)

type MTask struct {
}

func (m *MTask) AddTask(newTask *entities.Task) (int, error) {
	query := "INSERT INTO tasks (text, status, colour, assignedto, project_id, " +
		"creator, estimatedtime, spenttime) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id"

	var id int

	err := app.DB.QueryRow(query,
		newTask.Text,
		newTask.Status,
		newTask.Colour,
		newTask.AssignedToId,
		newTask.ProjectId,
		newTask.CreatorId,
		newTask.EstimatedTime,
		newTask.SpentTime).Scan(&id)
	fmt.Println(err)
	return id, err
}

func (m *MTask) GetAllTasksFromProject(projectId int) ([]*entities.Task, error) {

	query := "SELECT text, status, colour, assignedto, project_id, creator, " +
		"estimatedtime, spenttime, id FROM tasks WHERE project_id = $1"

	rows, err := app.DB.Query(query, projectId)

	if err != nil {
		return nil, err
	}

	tasks := []*entities.Task{}

	for rows.Next() {
		i := entities.Task{}
		err := rows.Scan(&i.Text, &i.Status, &i.Colour, &i.AssignedToId,
			&i.ProjectId, &i.CreatorId, &i.EstimatedTime, &i.SpentTime, &i.Id)

		if err != nil {
			fmt.Println(err)
			continue
		}

		tasks = append(tasks, &i)
	}
	defer rows.Close()

	return tasks, err
}

func (m *MTask) GetTask(taskId int) (*entities.Task, error) {

	query := "SELECT text, status, colour, assignedto, project_id, creator, " +
		"estimatedtime, spenttime, id FROM tasks WHERE id = $1"

	row, err := app.DB.Query(query, taskId)

	if err != nil {
		return nil, err
	}

	defer row.Close()

	row.Next()
	i := entities.Task{}
	err = row.Scan(&i.Text, &i.Status, &i.Colour, &i.AssignedToId,
		&i.ProjectId, &i.CreatorId, &i.EstimatedTime, &i.SpentTime, &i.Id)

	if err != nil {
		fmt.Println(err)
	}

	return &i, err
}

func (m *MTask) UpdateTask(task *entities.Task) error {

	query := "UPDATE tasks SET text = $1, status = $2, colour = $3, assignedto = $4, " +
		"project_id = $5, creator = $6, estimatedtime = $7, spenttime = $8 WHERE id = $9"

	_, err := app.DB.Exec(query,
		task.Text, task.Status, task.Colour, task.AssignedToId,
		task.ProjectId, task.CreatorId, task.EstimatedTime, task.SpentTime, task.Id)

	return err

}

func (m *MTask) DeleteTask(taskId int) error {

	_, err := app.DB.Exec("DELETE FROM tasks WHERE id = $1", taskId)
	if err != nil {
		panic(err)
	}

	return err
}
