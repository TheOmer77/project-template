# Project Template

This is my personal full stack project template, consisting of a [React](https://reactjs.org/) frontend application run using [Vite](https://vitejs.dev/), and a [NodeJS](https://nodejs.org/) backend which uses [Express](https://expressjs.com/), both written in [TypeScript](https://www.typescriptlang.org/).

In local development, both the frontend & backend services are run using [Docker](https://www.docker.com/), and are both accessible from an [NGINX](https://www.nginx.com/) reverse proxy; Additional services & environment variables can be added in `docker-compose.yml`.

Additionally, this template includes a [Prettier](https://prettier.io/) `.prettierrc` for the entire project, as well as an [ESLint](https://eslint.org/) `.eslintrc.json` for both the frontend & the backend. Installing the relevant VSCode extensions is recommended.

## Local development

Run the project using Docker Compose:

```bash
docker compose up -d
```

Then just open [http://localhost](http://localhost) (port 80) in your web browser to access the frontend React app; the backend can be accessed from [http://localhost/api](http://localhost/api).

Any changes you make to the frontend will automatically be shown in the browser, while any changes made to the backend code will cause the development server (using `nodemon`) to restart.

### Installing dependencies

To install dependencies in a service, run:

```bash
npm i -w <service> <dependencies>
```

Note that you will have to rebuild the service you have installed dependencies in.

```bash
docker builder prune -af
docker compose up -d --build <service>
```

### Updating environment variables

Environment variables for the entire project are stored in the `.env` file. After editing this file, the new variables will not be applied until you recreate the services that use them:

```bash
docker compose up -d --force-recreate <services>
```

Note that if you add new variables to `.env`, you will have to add them to the appropriate services in `docker-compose.yml` **before you recreate the services.** Also note, that the frontend will only recognize variables starting with `VITE_` (this prefix can be changed).

```yml
frontend:
  environment:
    - VITE_ENV_VAR=${ENV_VAR}

backend:
  environment:
    - ENV_VAR=${ENV_VAR}
```

### Troubleshooting

#### No HMR/server not restarting when making changes

This is a common issue if you use Windows/WSL. Due to [a WSL limitation](https://github.com/microsoft/WSL/issues/4739), file system watching does not work when a file is edited by Windows applications (non-WSL2 process).

To fix it, you could either:

- **Recommended:** Move the project folder outside of a Windows filesystem (into your WSL distro), and use WSL2 applications to edit your files. Accessing the Windows filesystem from WSL2 is slow, so doing this will improve performance.
- Add `CHOKIDAR_USEPOLLING=true` to your `.env` file. Note that this [leads to high CPU utilization](https://github.com/paulmillr/chokidar#performance).

#### Cannot run `npm install` outside of containers

On Linux, you may see an empty `node_modules` folder created after building the services; If you then try to run `npm install` in either service, you could encounter a "permission denied" error.

This happens because, for some reason, Docker creates that empty `node_modules` folder which is **owned by root.**

To fix this, either change the owner of this `node_modules` folder to yourself, using:

```sh
sudo chown user:user node_modules
```

where `user` is your username, or simply delete that folder and then run `npm install` again, which will recreate it.
