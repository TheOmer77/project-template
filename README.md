# Project Template

This is my personal project template, used for building full stack applications.

## About this template

### Included apps and packages

- `@repo/frontend`: A [React](https://react.dev) app, bundled by Vite.
- `@repo/backend`: A backend server, powered by [Node.js](https://nodejs.org) and [Hono](https://hono.dev/).
- `@repo/shared`: A package for shared code between apps.
- `@repo/eslint-config`: ESLint presets used by other apps.
- `@repo/tsconfig`: Base tsconfig.json files used by other apps.
- A package builder service, responsible for automatically rebuilding shared packages on changes (in development only).
- An NGINX reverse proxy.

All apps and packages are built using [TypeScript](https://www.typescriptlang.org/).

### Docker

This project uses Docker and Docker Compose to build and run all apps. Additional services & environment variables can be added in `compose.yaml` for production, and `compose.dev.yaml` for development.

### Utilities

- [PNPM](https://pnpm.io/) as the package manager
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

Installing the relevant VSCode extensions is recommended.

## Run the project

### Prerequisites

- [Docker](https://www.docker.com/)

In development, you'll also need:

- [Node.js](https://nodejs.org/) 20
- [PNPM](https://pnpm.io/)

### Running the services

Run the project using Docker Compose:

```bash
docker compose up -d
```

The frontend app will be available at [http://localhost](http://localhost) (port 80), and the backend will be accessible from [http://localhost/api](http://localhost/api).

### Local development

Install dependencies using PNPM:

```bash
pnpm install
```

Use Docker Compose to run the project, making sure you use the development compose file:

```bash
docker compose -f compose.dev.yaml up -d
```

Then just open your web browser to access the frontend at [http://localhost](http://localhost) and the backend at [http://localhost/api](http://localhost/api), just like in production.

Any changes you make to the frontend during development will automatically be reflected in the browser, while any changes made to the backend code will cause the development server to restart. Both services will react to changes made to the package.

## Configuration

### Updating environment variables

Environment variables for the entire project are stored in the `.env` file. After editing this file:

- If any new variables were added, add them to the relevant services in `compose.yaml` (or `compose.dev.yaml` in development):

  > Note that all frontend variables have to be prefixed with `VITE_`; [This prefix can be changed](https://vitejs.dev/config/shared-options.html#envprefix).

  ```yml
  frontend:
    environment:
      - VITE_ENV_VAR=${ENV_VAR}

  backend:
    environment:
      - ENV_VAR=${ENV_VAR}
  ```

- Recreate the relevant services (use the correct compose file):

  ```bash
  docker compose up -d --force-recreate <services>
  ```

### Installing & updating dependencies

To install dependencies in an app or package, run:

```bash
pnpm -F @repo/<app> i <dependencies>
```

To install dependencies at the workspace root (usually dev dependencies), replace `-F @repo/<app>` with `-w`.

After dependency updates, rebuild the relevant services. If you installed dependencies in a package, rebuild all apps that use it & the package builder.

```bash
docker compose up -d --build <services>
```

### Troubleshooting

#### No HMR/server not restarting when making changes

This is a common issue if you use Windows/WSL. Due to [a WSL limitation](https://github.com/microsoft/WSL/issues/4739), file system watching does not work when a file is edited by Windows applications (non-WSL2 process).

To fix it, you can move the project folder outside of the Windows filesystem (into your WSL distro), and use WSL2 applications to edit your files. Accessing the Windows filesystem from WSL2 is slow, so doing this will improve performance.
