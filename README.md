# Task Manager — Base SERN Template

This repository contains a base template for a SERN (SQL, Express, React, Node) task management app using MySQL.

**Quickstart**

- Clone the repo:

  git clone <repo-url>
  cd Agile_method_collab

- Start MySQL via Docker Compose:

```bash
docker-compose up -d
```

- Server setup:

```bash
cd server
npm install
# copy .env.example to .env and edit if needed
# run migrations
npx knex migrate:latest --knexfile knexfile.js
# seed (optional)
npx knex seed:run --knexfile knexfile.js
npm run dev
```

- Client setup:

```bash
cd client
npm install
npm run dev
```

Default server API: `http://localhost:4000/api/*`.

**Testing workflow for team members**

- Create a feature branch from `main`: `git checkout -b feat/your-feature`
- Pull and rebase frequently: `git fetch && git rebase origin/main`
- Run local DB with `docker-compose up -d` before running migrations
- Run migrations and seeds locally to verify changes
- Run server and client locally and test endpoints/UI
- Push branch and open a Pull Request with description and testing steps

**Database**

- Knex is used for migrations and seeds. Config is in `server/knexfile.js`.
- Example env config: `server/.env.example`.

**Useful commands**

- Start DB: `docker-compose up -d`
- Run migrations: `npx knex migrate:latest --knexfile server/knexfile.js`
- Run seeds: `npx knex seed:run --knexfile server/knexfile.js`
- Start server in dev: `cd server && npm run dev`
- Start client: `cd client && npm run dev`

**Git & PR checklist**

- Branch from `main` using `feat/` or `fix/` prefixes
- Add concise commit messages
- Run migrations locally if your change touches the DB
- Include testing steps in the PR description
- Request at least one reviewer

If you want, I can also add a simple GitHub Actions workflow for CI in a follow-up.
