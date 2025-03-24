import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, map } from 'rxjs';

@Injectable()
export class DogsService {
  private readonly baseUrl = 'https://dog.ceo/api';

  constructor(private readonly httpService: HttpService) {}

  getAllBreeds(): Observable<any> {
    return this.httpService
      .get(`${this.baseUrl}/breeds/list/all`)
      .pipe(map((response) => response.data));
  }

  getBreedImages(breed: string): Observable<any> {
    return this.httpService
      .get(`${this.baseUrl}/breed/${breed}/images`)
      .pipe(map((response) => response.data));
  }

  getRandomImageByBreed(breed: string): Observable<any> {
    return this.httpService
      .get(`${this.baseUrl}/breed/${breed}/images/random`)
      .pipe(map((response) => response.data));
  }
} 