# Backend

## Build Docker Image

`npm install` gets stuck when not using `--network=host`.

```console
docker build --network=host -t wine-bakend .
```

## Start Container

```console
docker run -d --name wine-backend -p 3001:3001 backend
```

## Environment Variables

`DB_STRING` - MySQL Database Connection String