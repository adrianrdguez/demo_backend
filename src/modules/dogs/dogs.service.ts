import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, map } from 'rxjs';
import { DogBreeds, DogImages, DogRandomImage } from './interfaces/dog.interface';
import { PaginationQueryDto, PaginatedResponse } from './dto/pagination.dto';

@Injectable()
export class DogsService {
  private readonly baseUrl = 'https://dog.ceo/api';

  constructor(private readonly httpService: HttpService) {}

  getAllBreeds(query: PaginationQueryDto): Observable<PaginatedResponse<DogBreeds>> {
    return this.httpService
      .get<DogBreeds>(`${this.baseUrl}/breeds/list/all`)
      .pipe(
        map((response) => {
          const breeds = Object.keys(response.data.message);
          const totalItems = breeds.length;
          const page = query.page ?? 1;
          const limit = query.limit ?? 10;
          const startIndex = (page - 1) * limit;
          const endIndex = startIndex + limit;
          
          const paginatedBreeds = breeds
            .slice(startIndex, endIndex)
            .reduce((acc, breed) => {
              acc[breed] = response.data.message[breed];
              return acc;
            }, {});

          return {
            data: {
              message: paginatedBreeds,
              status: response.data.status,
            },
            metadata: {
              page,
              limit,
              totalItems,
              totalPages: Math.ceil(totalItems / limit),
            },
          };
        }),
      );
  }

  getBreedImages(breed: string): Observable<DogImages> {
    return this.httpService
      .get<DogImages>(`${this.baseUrl}/breed/${breed}/images`)
      .pipe(map((response) => response.data));
  }

  getRandomImageByBreed(breed: string): Observable<DogRandomImage> {
    return this.httpService
      .get<DogRandomImage>(`${this.baseUrl}/breed/${breed}/images/random`)
      .pipe(map((response) => response.data));
  }
} 