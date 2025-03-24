# Barkibu Backend

A NestJS-based REST API for dog-related information and images.

## Description

This API provides endpoints to fetch information about dog breeds and their images. Built with [NestJS](https://github.com/nestjs/nest) framework.

## API Documentation

The API documentation is available through Swagger UI at:
```
http://localhost:3000/api
```

You can explore and test all endpoints interactively through the Swagger interface.

## Features

- Get all dog breeds (with pagination and search)
- Get images for a specific breed
- Get random images for a specific breed
- Swagger API documentation

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

### Breeds
- `GET /dogs/breeds` - Get all available dog breeds
  - Query Parameters:
    - `page` (optional): Page number (default: 1)
    - `limit` (optional): Items per page (default: 10)
    - `search` (optional): Search term to filter breeds

### Images
- `GET /dogs/breed/:breed/images` - Get all images for a specific breed
- `GET /dogs/breed/:breed/random` - Get a random image for a specific breed

## Response Format

### Paginated Response
```json
{
  "data": {
    "message": {
      "breed1": [],
      "breed2": []
    },
    "status": "success"
  },
  "metadata": {
    "page": 1,
    "limit": 10,
    "totalItems": 95,
    "totalPages": 10
  }
}
```

## Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov

# test in watch mode
$ npm run test:watch

# test in debug mode
$ npm run test:debug
```

## License

[MIT licensed](LICENSE)
