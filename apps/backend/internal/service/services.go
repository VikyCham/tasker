package service

import (
	"github.com/VikyCham/tasker/internal/lib/job"
	"github.com/VikyCham/tasker/internal/repository"
	"github.com/VikyCham/tasker/internal/server"
)

type Services struct {
	Auth *AuthService
	Job  *job.JobService
}

func NewServices(s *server.Server, repos *repository.Repositories) (*Services, error) {
	authService := NewAuthService(s)

	return &Services{
		Job:  s.Job,
		Auth: authService,
	}, nil
}
