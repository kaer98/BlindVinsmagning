# Backend

[![Docker Image CI](https://github.com/kaer98/BlindVinsmagning/actions/workflows/docker-image.yml/badge.svg)](https://github.com/kaer98/BlindVinsmagning/actions/workflows/docker-image.yml)

## Table of Contents

- [API Documentation](#api-documentation)
  - [Users](#users)
    - [GET /api/users](#get-apiusers)
    - [GET /api/users/:id](#get-apiusersid)
    - [DELETE /api/users](#delete-apiusers)
    - [DELETE /api/users/:id](#delete-apiusersid)
  - [Auth](#auth)
    - [POST /api/auth/signup](#post-apiauthsignup)
    - [POST /api/auth/login](#post-apiauthlogin)
    - [POST /api/auth/logout](#post-apiauthlogout)
  - [Wine](#wine)
    - [POST /api/wines](#post-apiwines)
    - [GET /api/wines](#get-apiwines)
  - [Tastings](#tastings)
    - [POST /api/tastings](#post-apitastings)
    - [GET /api/tastings](#get-apitastings)
    - [GET /api/tastings/:id](#get-apitastingsid)
    - [GET /api/tastings/join/:id](#get-apitastingsjoinid)
  - [Evaluations](#evaluations)
    - [GET /api/evaluations](#get-apievaluations)
    - [POST /api/evaluations](#post-apievaluations)
    - [PUT /api/evaluations/:id](#put-apievaluationsid)
- [Enums](#enums)
- [Docker Setup](#docker-setup)
  - [Build Docker Image](#build-docker-image)
  - [Environment Variables](#environment-variables)
  - [Start Container](#start-container)
  - [Start Container Shell](#start-container-shell)
  - [Push Image to Registry](#push-image-to-registry)

**Base URL:** `https://vin.jazper.dk/`

## API Documentation

### Users

#### GET `/api/users`

- **Description:** Retrieves all users.
- **Controller:** `getUsers`
- **Response:**
  - `200 OK` with an array of user objects.

#### GET `/api/users/:id`

- **Description:** Retrieves a specific user by ID.
- **Parameters:**
  - `id` (integer, required): User ID.
- **Controller:** `getUserById`
- **Response:**
  - `200 OK` with the user object if found.
  - `404 Not Found` if the user with the specified ID does not exist.

#### DELETE `/api/users`

- **Description:** Deletes all users.
- **Controller:** `deleteAllUsers`
- **Response:**
  - `200 OK` with a success message if users are deleted.
  - `404 Not Found` if no users are found to delete.

#### DELETE `/api/users/:id`

- **Description:** Deletes a specific user by ID.
- **Parameters:**
  - `id` (integer, required): User ID.
- **Controller:** `deleteUserById`
- **Response:**
  - `200 OK` with a success message if the user is deleted.
  - `404 Not Found` if the user with the specified ID does not exist.

### Auth

#### POST `/api/auth/signup`

- **Description:** Creates a new user account.
- **Controller:** `signup`
- **Request Body:**
  - `fullname` (string, required): Full name of the user.
  - `birthday` (string, required): Date of birth of the user (format: 'YYYY-MM-DD').
  - `gender` ([GenderEnum](#genderenum), required): Gender of the user.
  - `username` (string, required): Username of the user.
  - `password` (string, required): Password of the user.
  - `confirmPassword` (string, required): Confirm password for validation.
- **Response:**
  - `201 Created` with the newly created user object.
    - JWT Cookie is returned for authentication on other endpoints.
  - `400 Bad Request` if any required fields are missing or passwords don't match.

#### POST `/api/auth/login`

- **Description:** Authenticates a user and generates a JWT token for access.
- **Controller:** `login`
- **Request Body:**
  - `username` (string, required): Username of the user.
  - `password` (string, required): Password of the user.
- **Response:**
  - `200 OK` with user information and JWT token if authentication is successful.
    - JWT Cookie is returned for authentication on other endpoints.
  - `400 Bad Request` if username or password is incorrect.

#### POST `/api/auth/logout`

- **Description:** Logs out a user by clearing the JWT token.
- **Controller:** `logout`
- **Cookie:**
  - `JWT` (string, required): JWT Cookie recieved from the [login](#post-apilogin) or [signup](#post-apisignup) endpoint.
- **Response:**
  - `200 OK` with a success message if logout is successful.

### Wine

#### POST `/api/wines`

- **Description:** Creates a new wine entry.
- **Controller:** `createWines`
- **Request Body:**
  - `name` (string, required): Name of the wine.
  - `country` (string, required): Country of origin for the wine.
  - `region` (string, required): Region where the wine is produced.
  - `prodyear` (string, required): Production year of the wine (format: 'YYYY').
  - `producer` (string, required): Producer of the wine.
  - `alcohol` (integer, required): Alcohol content of the wine.
  - `type` (string, required): Type of the wine (e.g., red, white, rosé).
  - `grape` (string, required): Grape variety used in the wine.
  - `price` (integer, required): Price of the wine.
  - `currency` (string, required): Currency of the price.
- **Response:**
  - `201 Created` if the wine is successfully created.
  - `400 Bad Request` if any required fields are missing or if a wine with the same name already exists.

#### GET `/api/wines`

- **Description:** Retrieves all wines.
- **Controller:** `getAllWines`
- **Response:**
  - `200 OK` with an array of wine objects.

### Tastings

#### POST `/api/tastings`

- **Description:** Creates a new wine tasting.
- **Controller:** `createTasting`
- **Request Body:**
  - `name` (string, required): Name of the wine tasting.
  - `visibility` ([VisibilityEnum](#visibilityenum), required): Visibility status of the tasting.
  - `date` (string, required): Date of the tasting (format: 'YYYY-MM-DD').
  - `wines` (array, required): Array of wine IDs associated with the tasting.
- **Cookie:**
  - `JWT` (string, required): JWT Cookie recieved from the [login](#post-apilogin) or [signup](#post-apisignup) endpoint.
- **Response:**
  - `201 Created` with the new tastings object.
  - `400 Bad Request` if any required fields are missing or if a tasting with the same name already exists.

#### GET `/api/tastings`

- **Description:** Retrieves all wine tastings.
- **Controller:** `getAllTastings`
- **Response:**
  - `200 OK` with an array of wine tasting objects.

#### GET `/api/tastings/:id`

- **Description:** Retrieves a specific tasting by ID.
- **Parameters:**
  - `id` (integer, required): Tastings ID.
- **Controller:** `getTastingsById`
- **Response:**
  - `200 OK` with the tastings object if found.
  - `404 Not Found` if the tasting with the specified ID does not exist.

#### GET `/api/tastings/join/:id`

- **Description:** Allows a user to join a wine tasting event.
- **Controller:** `joinTasting`
- **Parameters:**
  - `id` (integer, required): The ID of the wine tasting event to join.
- **Cookie:**
  - `JWT` (string, required): JWT Cookie recieved from the [login](#post-apilogin) or [signup](#post-apisignup) endpoint.
- **Response:**
  - `200 OK` with message "Deltager tilføjet" if successfully joined.
  - `400 Bad Request` with error "Du deltager allerede i denne smagning" if user is already a participant.
  - `401 Unauthorized` with error "Du skal være logget ind for at deltage" if user is not logged in.
  - `404 Not Found` with error "Smagning ikke fundet" if the tasting event does not exist.

### Evaluations

#### GET `/api/evaluations`

- **Description:** Retrieves all evaluations.
- **Controller:** `getAllEvaluations`
- **Response:**
  - `200 OK` with an array of evaluation objects.

#### POST `/api/evaluations`

- **Description:** Creates a new evaluation.
- **Controller:** `createEvaluation`
- **Request Body:**
  - `name` (string, required): Name of the evaluation.
  - `wineId` (integer, required): Id of the wine to make an evaluation on.
  - `tastingId` (integer, required): Id of the tastings to evaluate.
- **Cookie:**
  - `JWT` (string, required): JWT Cookie recieved from the [login](#post-apilogin) or [signup](#post-apisignup) endpoint.
- **Response:**
  - `201 Created` with the new tastings object.
  - `400 Bad Request` if any required fields are missing or if a tasting with the same name already exists.

#### PUT `/api/evaluations/:id`

    if (!tannin || !aIntensity || !nIntensity || !sweetness || !acidity || !aromacharacteristics ||
        !alcohol || !body || !flavourintensity || !flavourcharacteristics || !finish || !quality) {
        return response.status(400).json({ error: 'Ugyldige requests fra Request body.' });

- **Description:** Update an evaluation.
- **Controller:** `addWset`
- **Parameters:**
  - `id` (integer, required): The ID of the wine tasting event.
 **Request Body:**
  - `tannin` ([TanninEnum](#tanninenum), required): Tannin rating.
  - `aIntensity` ([AIntensityEnum](#aintensityenum), required): Appearance intensity.
  - `nIntensity` ([NIntensity](#nintensityenum), required): Nose intensity.
  - `sweetness` ([SweetnessEnum](#sweetnessenum), required): Sweetness rating.
  - `acidity` ([AcidityEnum](#acidityenum), required): Acidity rating.
  - `aromacharacteristics` (string, required): Aroma characteristics.
  - `alcohol` ([AlchoholEnum](#alchoholenum), required): Acohol rating.
  - `body` ([BodyEnum](#bodyenum), required): Wine body rating.
  - `flavourintensity` ([FlavourIntensityEnum](#flavourintensityenum), required): Flavour intensity rating.
  - `flavourcharacteristics` (string, required): Flavour characteristics.
  - `quality` ([QualityEnum](#qualityenum), required): Quality rating.
  - `acolourintensity` ([AColourIntensity](#acolourintensity), required): Color intensity.
  - `note` (string, required): Note to add to the evaluation.
  - `wineId` (integer, required): Id of the wine to evaluate.
- **Cookie:**
  - `JWT` (string, required): JWT Cookie recieved from the [login](#post-apilogin) or [signup](#post-apisignup) endpoint.
- **Response:**
  - `200 OK` with name of the updated evaluation.
  - `500 Server Error` with WSET not updated error.

## Enums

### GenderEnum

| Male | Female |
|------|--------|

### VisibilityEnum

| Blind | SemiBlind | Open |
|-------|-----------|------|

### AlchoholEnum

| Low | Medium | High |
|-----|--------|------|

### AcidityEnum

| Low | Medium | High |
|-----|--------|------|

### TanninEnum

| Low | Medium | High |
|-----|--------|------|

### BodyEnum

| Light | Medium | Full |
|-------|--------|------|

### FlavourIntensityEnum

| Light | Medium | Pronounced |
|-------|--------|------------|

### SweetnessEnum

| Dry | OffDry | Medium | Sweet |
|-----|--------|--------|-------|

### FinishEnum

| Short | Medium | Long |
|-------|--------|------|

### QualityEnum

| Poor     | Fair   | Good   | Excellent |
|----------|--------|--------|-----------|

### GiveStarEnum

| One   | Two    | Three  | Four   | Five   |
|-------|--------|--------|--------|--------|

### AIntensityEnum

| Low | Medium | High |
|-----|--------|------|

### NIntensityEnum

| Low | Medium | High |
|-----|--------|------|

### AColourIntensity

| Lemon | Gold | Amber | Pink | PinkOrange | Orange | Ruby | Garnet | Tawny | Purple |
|-------|------|-------|------|------------|--------|------|--------|-------|--------|

## Docker Setup

### Build Docker Image

Only for local builds. Production builds are build automatically on github.

```console
docker build --no-cache -t wine-backend .
```

### Environment Variables

| Variable | Type | Required | Description |
|----------|------|----------|-------------|
| DATABASE_URL | String | True | Postgres Connection String. |
| JWT_SECRET | String | True | JWT Secret used to sign tokens. |

### Start Container

```console
docker run -d --name backend \
    -e DATABASE_URL="postgresql://connection-string-here" \
    -e JWT_SECRET="verysecret" \
    -p 3000:3000 registry.jazper.dk/wine-backend:latest
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
