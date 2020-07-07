package controllers

import (
	"github.com/revel/revel"
)

type CIndex struct {
	*revel.Controller
}

//Обработчик запросов с /
func (c *CIndex) TaskManager() revel.Result {
	return c.Render()
}
