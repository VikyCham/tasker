package v1

import (
	"github.com/VikyCham/tasker/internal/handler"
	"github.com/VikyCham/tasker/internal/middleware"
	"github.com/labstack/echo/v4"
)

func registerTodoRoutes(r *echo.Group, h *handler.TodoHandler, ch *handler.CommentHandler, auth *middleware.AuthMiddleware) {

	// Todo operations
	todos := r.Group("/todos")
	todos.Use(auth.RequireAuth)

	// collection operation
	todos.POST("", h.CrateTodo)
	todos.GET("", h.GetTodos)
	todos.GET("/stats", h.GetTodoStats)

	//individual todo operations
	dynamicTodo := todos.Group("/:id")
	dynamicTodo.GET("", h.GetTodoByID)
	dynamicTodo.PATCH("", h.UpdateTodo)
	dynamicTodo.DELETE("", h.DeleteTodo)

	// todos comments
	todoComments := dynamicTodo.Group("/comments")
	todoComments.POST("", ch.AddComment)
	todoComments.GET("", ch.GetCommentsByTodoID)
}