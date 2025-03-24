import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Observable, map } from 'rxjs';
import { DogBreeds, DogImages, DogRandomImage } from './interfaces/dog.interface';
import { PaginationQueryDto, PaginatedResponse } from './dto/pagination.dto';

@Injectable()
export class DogsService {
  private readonly baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>('DOGS_API_URL') ?? 'https://dog.ceo/api';
  }

  getAllBreeds(query: PaginationQueryDto): Observable<PaginatedResponse<DogBreeds>> {
    return this.httpService
      .get<DogBreeds>(`${this.baseUrl}/breeds/list/all`)
      .pipe(
        map((response) => {
          let breeds = Object.keys(response.data.message);
          
          // Apply search filter if searching
          if (query.search) {
            const searchTerm = query.search.toLowerCase();
            breeds = breeds.filter(breed => 
              breed.toLowerCase().includes(searchTerm)
            );
          }

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