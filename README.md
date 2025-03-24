# Barkibu Backend

A NestJS-based REST API for dog-related information and images.

## Description

This API provides endpoints to fetch information about dog breeds and their images. Built with [NestJS](https://github.com/nestjs/nest) framework.

## Features

- Get all dog breeds
- Get images for a specific breed
- Get random images for a specific breed
- Swagger API documentation

## API Documentation

Once the server is running, you can access the Swagger documentation at:
```
http://localhost:3000/api
```

## Project setup

```bash
# Install dependencies
$ npm install

# Create environment file
$ cp .env.example .env
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Endpoints

- `GET /dogs/breeds` - Get all available dog breeds
- `GET /dogs/breed/:breed/images` - Get all images for a specific breed
- `GET /dogs/breed/:breed/random` - Get a random image for a specific breed


## License

[MIT licensed](LICENSE)
