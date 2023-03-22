# Movie and TV shows API

This is an API to read and create movies and TV shows

## Install

    npm install
    npm run build

## Run the app

    npm run start
    
## Environment Variables

    MONGO_DATABASE_URL=
    PORT=
    JWT_SECRET=
    JWT_REFRESH_SECRET=
    SALT_ROUNDS=

# REST API

This is an example of how the service works:

## Sign up

### Request

`POST auth/signup`

    body: {
      "email": string,
      "password": string,
    }

### Response

    data: {
      "access_token": string,
      "refresh_token": string,
    }
    
## Login

### Request

`POST auth/login`

    body: {
      "email": string,
      "password": string,
    }

### Response

    data: {
      "access_token": string,
      "refresh_token": string,
    }
    
## Refresh

### Request

`POST auth/refresh`

    body: {
      "refreshToken": string
    }

### Response

    data: {
      "access_token": string,
      "refresh_token": string,
    }
    
## Get movies

### Request

`GET /movie/`

    query: {
      "title": string,
      "sortByRating": boolean,
      "genre": string
    }

### Response

    data: {
      "title": string,
      "description": string,
      "genre": string,
      "year": number,
      "rating": number,
      "minutes": number,
      "directorId": string,
      "actorsId": string[],
      "director": { name: string };
      "actors": { name: string }[];
    }

## Create movie

### Request

`POST /movie/`

    body: {
      "title": string;
      "description": string;
      "genre": string;
      "year": number;
      "directorId": string;
      "actorsId": string[];
      "rating": number;
      "minutes": number;
    }

### Response

    {
      data: true
    }
    
    
## Get TV Shows

### Request

`GET /tv-show/episode`

    query: {
      "name": string,
      "seasonNumber": string,
      "episodeNumber": string
    }

### Response

    data: {
      "number": number,
      "title": string,
      "minutes": number,
      "description": string,
      "rating": number,
      "releaseDate": Date,
      "directorId": string,
      "director": { "name": string },
    }
