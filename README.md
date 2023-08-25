# Project Template

This is my personal full stack project template, consisting of:

- A frontend app, which uses React and is bundled by Vite.
- A backend server, powered by Node.js and Express.
- A package for shared code between services, and a service that automatically rebuilds it on changes.
- An NGINX reverse proxy.

Other technologies used in the entire project include TypeScript for the frontend, backend and package, and Docker which runs all services. \
This template also includes a Prettier `.prettierrc` and an ESLint `.eslintrc.json` for the entire project, as well as an `.eslintrc.json` specific to the frontend. Installing the relevant VSCode extensions is recommended.

Additional services & environment variables can be added in `docker-compose.yml`.

## Local development

### Prerequisites

- [NodeJS](https://nodejs.org/) 18
- [Docker](https://www.docker.com/)

### Running the services

Run the project using Docker Compose:

```bash
docker compose up -d
```

Then just open [http://localhost](http://localhost) (port 80) in your web browser to access the frontend React app; the backend can be accessed from [http://localhost/api](http://localhost/api).

Any changes you make to the frontend will automatically be shown in the browser, while any changes made to the backend code will cause the development server (using `nodemon`) to restart. Both services will react to changes made to the package.

### Installing dependencies

- To install dependencies in a service, run:

  ```bash
  npm i -w services/<service> <dependencies>
  ```

  To install in a package, it's very similar:

  ```bash
  npm i -w packages/<package> <dependencies>
  ```

- Rebuild the service you have installed dependencies in. If dependencies were installed in the package, rebuild both the frontend, backend & package builder.

  ```bash
  docker builder prune -af
  docker compose up -d --build <services>
  ```

### Updating environment variables

Environment variables for the entire project are stored in the `.env` file. After editing this file:

- If any new variables were added, add them to the relevant services in `docker-compose.yml`:

  > Note that frontend variables have to be prefixed with `VITE_` (this prefix can be changed).

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

### Troubleshooting

#### No HMR/server not restarting when making changes

This is a common issue if you use Windows/WSL. Due to [a WSL limitation](https://github.com/microsoft/WSL/issues/4739), file system watching does not work when a file is edited by Windows applications (non-WSL2 process).

To fix it, you could either:

- **Recommended:** Move the project folder outside of a Windows filesystem (into your WSL distro), and use WSL2 applications to edit your files. Accessing the Windows filesystem from WSL2 is slow, so doing this will improve performance.
- Add `CHOKIDAR_USEPOLLING=true` to your `.env` file. Note that this [leads to high CPU utilization](https://github.com/paulmillr/chokidar#performance).
