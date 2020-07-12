package mappers

import (
	"fmt"
	"taskmanager/app"
	"taskmanager/app/entities"
)

type MComment struct {
}

//Создаёт новый комментарий
func (m *MComment) AddComment(newComment *entities.Comment) (int, error) {

	query := "INSERT INTO comments (authorid, taskid, text) VALUES ($1, $2, $3) RETURNING id"

	var id int

	err := app.DB.QueryRow(query,
		newComment.AuthorId,
		newComment.TaskId,
		newComment.Text).Scan(&id)

	return id, err

}

//Возвращает всех сотрудников из проекта в виде объектов Comment
func (m *MComment) GetAllCommentsFromProject(projectId int) ([]*entities.Comment, error) {

	query := "SELECT comments.id, authorid, taskid, comments.text " +
		"FROM comments INNER JOIN tasks " +
		"ON comments.taskid = tasks.id " +
		"WHERE project_id = $1"

	rows, err := app.DB.Query(query, projectId)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	comments := []*entities.Comment{}

	for rows.Next() {
		i := entities.Comment{}
		err = rows.Scan(&i.Id, &i.AuthorId, &i.TaskId, &i.Text)

		if err != nil {
			fmt.Println(err)
			continue
		}
		comments = append(comments, &i)
	}

	return comments, err
}

//Возвращает сотрудника в виде объекта Employee
func (m *MComment) GetComment(id int) (*entities.Comment, error) {

	query := "SELECT id, authorid, taskid, text FROM comments WHERE id = $1"

	row, err := app.DB.Query(query, id)

	if err != nil {
		return nil, err
	}

	defer row.Close()

	row.Next()
	i := entities.Comment{}
	err = row.Scan(&i.Id, &i.AuthorId, &i.TaskId, &i.Text)

	return &i, err

}