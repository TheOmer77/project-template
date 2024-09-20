# Project Template

This is my personal project template, used for building full stack applications.

## About this template

### Included apps and packages

- `@repo/frontend`: A [React](https://react.dev) app, bundled by Vite.
- `@repo/backend`: A backend server, powered by [Node.js](https://nodejs.org) and [Hono](https://hono.dev/).
- `@repo/shared`: A package for shared code between services.
- `package-builder`: A service responsible for automatically rebuilding shared packages on changes (in development only).
- An NGINX reverse proxy.

All apps and packages are built using [TypeScript](https://www.typescriptlang.org/).

### Docker

This project uses Docker and Docker Compose to build and run all services. Additional services & environment variables can be added in `docker-compose.yml`.

### Utilities

- [PNPM](https://pnpm.io/) as the package manager
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

Installing the relevant VSCode extensions is recommended.

### What's NOT included

TODO

## Local development

### Prerequisites

- [Node.js](https://nodejs.org/) 20
- [PNPM](https://pnpm.io/)
- [Docker](https://www.docker.com/)

### Running the services

Run the project using Docker Compose:

```bash
docker compose up -d
```

Then just open [http://localhost](http://localhost) (port 80) in your web browser to access the frontend React app; the backend can be accessed from [http://localhost/api](http://localhost/api).

Any changes you make to the frontend will automatically be shown in the browser, while any changes made to the backend code will cause the development server to restart. Both services will react to changes made to the package.

### Updating environment variables

Environment variables for the entire project are stored in the `.env` file. After editing this file:

- If any new variables were added, add them to the relevant services in `docker-compose.yml`:

  > Note that all frontend variables have to be prefixed with `VITE_`; [This prefix can be changed](https://vitejs.dev/config/shared-options.html#envprefix).

  ```yml
  frontend:
    environment:
      - VITE_ENV_VAR=${ENV_VAR}

  backend:
    environment:
      - ENV_VAR=${ENV_VAR}
  ```

- Recreate the relevant services:

  ```bash
  docker compose up -d --force-recreate <services>
  ```

### Installing & updating dependencies

To install dependencies in a service or package, run:

```bash
pnpm -F <service> i <dependencies>
```

To install dependencies for the entire project (usually dev dependencies), the `-F` flag is not needed.

After dependency updates, rebuild the relevant services. If dependencies were installed in a package, rebuild all services that use it & the package builder.

```bash
docker builder prune -af
docker compose up -d --build <services>
```

### Troubleshooting

#### No HMR/server not restarting when making changes

This is a common issue if you use Windows/WSL. Due to [a WSL limitation](https://github.com/microsoft/WSL/issues/4739), file system watching does not work when a file is edited by Windows applications (non-WSL2 process).

To fix it, you could either:

- **Recommended:** Move the project folder outside of a Windows filesystem (into your WSL distro), and use WSL2 applications to edit your files. Accessing the Windows filesystem from WSL2 is slow, so doing this will improve performance.
- Add `CHOKIDAR_USEPOLLING=true` to your `.env` file. Note that this [leads to high CPU utilization](https://github.com/paulmillr/chokidar#performance).
