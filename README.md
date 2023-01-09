# Project Template

This is my personal full stack project template, consisting of a [React](https://reactjs.org/) frontend application run using [Vite](https://vitejs.dev/), and a [NodeJS](https://nodejs.org/) backend which uses [Express](https://expressjs.com/), both written in [TypeScript](https://www.typescriptlang.org/).

In local development, both the frontend & backend services are run using [Docker](https://www.docker.com/), and are both accessible from an [NGINX](https://www.nginx.com/) reverse proxy; Additional services & environment variables can be added in `docker-compose.yml`.

Additionally, this template includes a [Prettier](https://prettier.io/) `.prettierrc` for the entire project, as well as an [ESLint](https://eslint.org/) `.eslintrc.json` for both the frontend & the backend. Installing the relevant VSCode extenstions is recommended.

## Local development

Run the project using Docker Compose:

```bash
docker compose up -d
```

Then just open [http://localhost](http://localhost) (port 80) in your web browser to access the frontend React app; the backend can be accessed from [http://localhost/backend](http://localhost/backend).

Any changes you make to the frontend will automatically be shown in the browser, while any changes made to the backend code will cause the development server (using `nodemon`) to restart.

### Updating dependencies

If you install or update any dependencies in either service, you need to rebuild the service you have installed dependencies in. Run the following, replacing `<services>` with the services you want to rebuild:

```bash
docker builder prune -af
docker compose up -d --build <service>
```

### Updating environment variables

If you update any environment variables, the changes are not shown automatically; However, a full rebuild is not necessary - recreating the container is enough. Run the following, replacing `<services>` with the services you want to recreate:

```bash
docker compose up -d --force-recreate <services>
```

### Problems you may encounter

#### No HMR/server not restarting when making changes

This is a common issue if you use Windows/WSL. Due to [a WSL limitation](https://github.com/microsoft/WSL/issues/4739), file system watching does not work when a file is edited by Windows applications (non-WSL2 process).

This can be fixed by setting the `CHOKIDAR_USEPOLLING` environment variable to `true` - create an `.env` file and add the following to it:

```ini
CHOKIDAR_USEPOLLING=true
```

#### Cannot run `npm install` outside of containers

On Linux, you may see an empty `node_modules` folder created after building the services; If you then try to run `npm install` in either service, you could encounter a "permission denied" error.

This happens because, for some reason, Docker creates that empty `node_modules` folder which is **owned by root.**

To fix this, either change the owner of this `node_modules` folder to yourself, using:

```sh
sudo chown user:user node_modules
```

where `user` is your username, or simply delete that folder and then run `npm install` again, which will recreate it.
