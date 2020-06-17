package controllers

import (
	"github.com/revel/revel"
)

//Контроллер
type App struct {
	*revel.Controller
}

//Использовал для обучения, можно удалить
func (c App) Index() revel.Result {
	return c.Render()
}

//Использовал для обучения, можно удалить
func (c App) Hello(myName string) revel.Result {
	return c.Render(myName)
}

//Обработчик запросов с /
func (c App) TaskManager() revel.Result {
	return c.Render()
}
