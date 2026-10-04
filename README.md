# Tasker

![Tasker landing page](docs/images/tasker_homepage.png)

A simple task management app built with React and Go. Organize tasks, set priorities and due dates, and keep notes and files alongside your work.

## Features

- Clerk sign-in and account management.
- Tasks with categories, priorities, due dates, and status tracking.
- Dashboard statistics, search, filters, comments, and attachments.
- Light and dark themes, background emails, and scheduled job commands.

## Tech stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, shadcn/ui, TanStack Query.
- **Backend:** Go, Echo, PostgreSQL, Redis, Asynq.
- **Integrations:** Clerk, Resend, S3-compatible storage; optional New Relic.
- **Workspace:** Bun, Turborepo, shared Zod schemas, ts-rest/OpenAPI contracts, React Email.

## Project structure

```text
tasker/
|-- apps/
|   |-- backend/       # Go API, migrations, background jobs, email templates
|   `-- frontend/      # React pages, components, and API client
|-- packages/
|   |-- zod/           # Shared schemas and types
|   |-- openapi/       # API contracts and documentation generation
|   `-- emails/        # React Email templates
|-- docs/images/      # README screenshots
|-- package.json      # Workspace scripts
`-- turbo.json        # Task orchestration
```

## Local setup

**Requirements:** Go 1.24.5+, Node.js 22+, Bun 1.2.13, the [Task CLI](https://taskfile.dev/installation/), PostgreSQL, Redis, and Clerk, Resend, and S3 credentials. Docker can run the local services below.

### 1. Install dependencies

```sh
git clone https://github.com/VikyCham/tasker.git
cd tasker
bun install
cd apps/backend
go mod download
cd ../..
```

### 2. Start local services

Skip this step if PostgreSQL and Redis are already running; create a `tasker` database and use your connection details.

```sh
docker run --name tasker-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=tasker -p 5432:5432 -v tasker-postgres-data:/var/lib/postgresql/data -d postgres:15-alpine
docker run --name tasker-redis -p 6379:6379 -d redis:7-alpine
```

### 3. Configure environment files

Copy [apps/backend/.env.sample](apps/backend/.env.sample) to `apps/backend/.env` and keep its dotted variable names. Set the database password to `postgres` for the Docker example, replace the Clerk secret and Resend key, and change Redis to `TASKER_REDIS.ADDRESS="localhost:6379"` (without `redis://`). Add the required storage settings:

```dotenv
TASKER_AWS.REGION="your-bucket-region"
TASKER_AWS.ACCESS_KEY_ID="your-access-key"
TASKER_AWS.SECRET_ACCESS_KEY="your-secret-key"
TASKER_AWS.UPLOAD_BUCKET="your-bucket"
TASKER_AWS.ENDPOINT_URL=""
```

Use an endpoint URL for S3-compatible providers; leave it empty for AWS S3. For local development without New Relic, remove the `TASKER_OBSERVABILITY.*` entries to use defaults.

Copy [apps/frontend/.env.local.sample](apps/frontend/.env.local.sample) to `apps/frontend/.env.local` and set `VITE_CLERK_PUBLISHABLE_KEY` to your Clerk publishable key. Keep `VITE_API_URL="http://localhost:8080"` and `VITE_ENV="local"` for local development.

Use Clerk keys from the same instance. Keep secrets out of Git and frontend variables. The API URL should have no trailing slash or API suffix.

### 4. Migrate and start the backend

From `apps/backend`:

```sh
go install github.com/jackc/tern/v2@v2.3.3
task migrations:up TASKER_DB_DSN="postgres://postgres:postgres@localhost:5432/tasker?sslmode=disable"
task run
```

Ensure Go's binary directory is on `PATH` for `tern`. Local mode requires manual migrations. Run the backend from this directory so environment, documentation, and template paths resolve correctly.

### 5. Start the frontend

In another terminal, from the repository root:

```sh
bun run dev
```

This starts the frontend, shared package watchers, and email preview; the Go backend runs separately.

- **App:** http://localhost:3000
- **API docs:** http://localhost:8080/docs (API prefix: `/api/v1`)
- **Health:** http://localhost:8080/status
- **Email preview:** http://localhost:3001

## Useful commands

From the root: `bun run build`, `bun run lint`, `bun run --cwd packages/openapi gen`, and `bun run --cwd packages/emails export`.

From `apps/frontend`: `bunx tsc -b` for TypeScript checks.

Backend tasks are defined in [Taskfile.yml](apps/backend/Taskfile.yml). Run them from `apps/backend`:

| Command | Purpose |
| --- | --- |
| `task run` | Start the Go API with `go run ./cmd/tasker` |
| `task tidy` | Format Go code, tidy module dependencies, and verify downloaded modules |
| `task migrations:up TASKER_DB_DSN="<connection-string>"` | Apply database migrations |
| `task migrations:new name=<migration_name>` | Create a migration file |
| `task help` | List available tasks |

From `apps/backend`: `go build ./cmd/tasker`, `go vet ./...`, `go test ./...` (requires Docker), and `go run ./cmd/cron list` for scheduled jobs. Cron jobs need an external scheduler for recurring runs.

The root build covers JavaScript workspaces only. For email delivery, configure your Resend sender in `apps/backend/internal/lib/email/client.go`.

## License

No root license file has been added yet.
