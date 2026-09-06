# MyWallet

The frontend and backend run together with Docker Compose as two services.

## Run the application

From the `mywallet-app` folder:

```sh
docker compose up --build
```

Open the web app at <http://localhost:8081>. The backend API is available at
<http://localhost:3030/api>.

The backend reads its database and authentication configuration from
`backend/.env`.

## Stop the application

```sh
docker compose down
```

To run in the background, add `-d` to the start command.

## Development with automatic reload

Start both services and watch the frontend and backend files:

```sh
docker compose watch
```

Source changes are synchronized into the running containers. Changes to
dependencies or the Prisma schema automatically rebuild the affected service.
