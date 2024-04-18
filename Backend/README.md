# Backend

<!-- TOC ignore:true -->
## Table of Contents
<!-- TOC -->

- [Backend](#backend)
    - [Documentation](#documentation)
        - [Users](#users)
            - [GET /api/users](#get-apiusers)
            - [GET /api/users/:id](#get-apiusersid)
            - [POST /api/users](#post-apiusers)
            - [DELETE /api/users](#delete-apiusers)
            - [DELETE /api/users/:id](#delete-apiusersid)
            - [PUT /api/users/](#put-apiusers)
        - [Auth](#auth)
            - [POST /api/signup](#post-apisignup)
            - [POST /api/login](#post-apilogin)
            - [POST /api/logout](#post-apilogout)
    - [Docker Setup](#docker-setup)
        - [Build Docker Image](#build-docker-image)
        - [Environment Variables](#environment-variables)
        - [Start Container](#start-container)
        - [Start Container Shell](#start-container-shell)
        - [Push Image to Registry](#push-image-to-registry)

<!-- /TOC -->

## Documentation

**Base URL:** `https://vin.jazper.dk/`

### Users

#### GET `/api/users`

- **Description:** Retrieves all users stored in the database.
- **Middleware:** `protectRoute`
- **Controller:** `getUsers`

#### GET `/api/users/:id`

- **Description:** Retrieves a specific user by their ID.
- **Parameters:**
  - `id` (integer): User ID.
- **Controller:** `getUserById`

#### POST `/api/users`

- **Description:** Creates a new user.
- **Controller:** `createUser`
- **Request Body:**
  - `fullName` (string, required): Full name of the user.
  - `birthday` (string, required): Date of birth of the user (format: 'YYYY-MM-DD').
  - `gender` (string, required): Gender of the user.
  - `username` (string, required): Username of the user.
  - `password` (string, required): Password of the user.

#### DELETE `/api/users`

- **Description:** Deletes all users from the database.
- **Controller:** `deleteAllUsers`

#### DELETE `/api/users/:id`

- **Description:** Deletes a specific user by their ID.
- **Parameters:**
  - `id` (integer): User ID.
- **Controller:** `deleteUserById`

#### PUT `/api/users/`

- **Description:** Placeholder for updating user data (not implemented yet).

### Auth

#### POST `/api/signup`

- **Method:** POST
- **Description:** Creates a new user account.
- **Controller:** `signup`
- **Request Body:**
  - `fullName` (string, required): Full name of the user.
  - `birthday` (string, required): Date of birth of the user (format: 'YYYY-MM-DD').
  - `gender` (string, required): Gender of the user.
  - `username` (string, required): Username of the user.
  - `password` (string, required): Password of the user.
  - `confirmPassword` (string, required): Confirm password for validation.

#### POST `/api/login`

- **Method:** POST
- **Description:** Authenticates a user and generates a JWT token for access.
- **Controller:** `login`
- **Request Body:**
  - `username` (string, required): Username of the user.
  - `password` (string, required): Password of the user.

#### POST `/api/logout`

- **Method:** POST
- **Description:** Logs out a user by clearing the JWT token.
- **Controller:** `logout`

## Docker Setup

### Build Docker Image

```console
docker build --no-cache -t wine-backend .
```

### Environment Variables

| Variable | Type | Required | Description |
|----------|------|----------|-------------|
| DATABASE_URL | String | True | MySQL Connection String. |
| JWT_SECRET | String | True | JWT Secret used to sign tokens. |

### Start Container

```console
docker run -d --name backend \
    -e DATABASE_URL="mysql://connection-string-here" \
    -e JWT_SECRET="verysecret" \
    -p 3000:3000 wine-backend
```

### Start Container Shell

```console
docker run -it --entrypoint /bin/bash wine-backend
```

### Push Image to Registry

```console
docker tag wine-backend registry.jazper.dk/wine-backend:latest
```

```console
docker push registry.jazper.dk/wine-backend:latest
```

On other machines, you can pull the image with this command.

```console
docker pull registry.jazper.dk/wine-backend:latest
```
