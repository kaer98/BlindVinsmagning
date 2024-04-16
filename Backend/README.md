# Backend

## Build Docker Image

```console
docker build -t wine-backend .
```

## Start Container

```console
docker run -d --name backend \
    -e DATABASE_URL="mysql://connection-string-here" \
    -p 3000:3000 wine-backend
```

## Start Container Shell

```console
docker run -it --entrypoint /bin/bash wine-backend
```

## Environment Variables

`DB_STRING` - MySQL Database Connection String
