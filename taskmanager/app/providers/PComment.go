package providers

import (
	"taskmanager/app/entities"
	"taskmanager/app/mappers"
)

type PComment struct {
	m mappers.MComment
}

func (p *PComment) AddComment(newComment *entities.Comment) (int, error) {

	return p.m.AddComment(newComment)
}


func (p *PComment) GetAllCommentsFromProject(projectId int) ([]*entities.Comment, error) {

	return p.m.GetAllCommentsFromProject(projectId)
}

//Возвращает сотрудника в виде объекта, и ошибку
func (p *PComment) GetComment(id int) (*entities.Comment, error) {

	return p.m.GetComment(id)
}
