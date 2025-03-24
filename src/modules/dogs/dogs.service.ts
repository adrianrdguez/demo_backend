import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, map } from 'rxjs';
import { DogBreeds, DogImages, DogRandomImage } from './interfaces/dog.interface';

@Injectable()
export class DogsService {
  private readonly baseUrl = 'https://dog.ceo/api';

  constructor(private readonly httpService: HttpService) {}

  getAllBreeds(): Observable<DogBreeds> {
    return this.httpService
      .get<DogBreeds>(`${this.baseUrl}/breeds/list/all`)
      .pipe(map((response) => response.data));
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