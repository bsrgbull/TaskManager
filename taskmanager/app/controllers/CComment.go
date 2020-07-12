package controllers

import (
	"taskmanager/app/entities"
	"taskmanager/app/providers"

	"github.com/mitchellh/mapstructure"
	"github.com/revel/revel"
)

type CComment struct {
	*revel.Controller
	p providers.PComment
}

//Обработчик POST запросов с /comment
func (c *CComment) AddComment() revel.Result {
	var jsonData map[string]interface{}
	err := c.Params.BindJSON(&jsonData)

	var id int

	if err == nil {
		var newComment entities.Comment
		err = mapstructure.Decode(jsonData, &newComment)

		if err == nil {
			id, err = c.p.AddComment(&newComment)
		}
	}

	response := entities.Resp{Data: id, Err: err}

	return c.RenderJSON(response)
}

//Обработчик GET запросов с /comments/:projectid
func (c *CComment) GetAllCommentsFromProject(projectid int) revel.Result {

	comments, err := c.p.GetAllCommentsFromProject(projectid)
	response := entities.Resp{Data: comments, Err: err}

	return c.RenderJSON(response)
}

//Обработчик GET запросов с /comment/:id
func (c *CComment) GetComment(id int) revel.Result {

	comment, err := c.p.GetComment(id)
	response := entities.Resp{Data: comment, Err: err}

	return c.RenderJSON(response)
}