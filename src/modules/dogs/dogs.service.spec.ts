import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { DogsService } from './dogs.service';
import { of } from 'rxjs';

describe('DogsService', () => {
  let service: DogsService;
  let httpService: HttpService;

  const mockHttpService = {
    get: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DogsService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    service = module.get<DogsService>(DogsService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('It should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllBreeds', () => {
    it('It should return all dog breeds', (done) => {
      const mockResponse = {
        data: {
          message: {
            husky: [],
            labrador: [],
          },
          status: 'success',
        },
      };

      mockHttpService.get.mockReturnValue(of(mockResponse));

      service.getAllBreeds({ page: 1, limit: 10 }).subscribe((result) => {
        expect(result.data.message).toEqual(mockResponse.data.message);
        expect(result.metadata).toBeDefined();
        expect(httpService.get).toHaveBeenCalledWith('https://dog.ceo/api/breeds/list/all');
        done();
      });
    });
  });

  describe('getBreedImages', () => {
    it('It should return images for a specific breed', (done) => {
      const breed = 'husky';
      const mockResponse = {
        data: {
          message: ['url1', 'url2'],
          status: 'success',
        },
      };

      mockHttpService.get.mockReturnValue(of(mockResponse));

      service.getBreedImages(breed).subscribe((result) => {
        expect(result).toEqual(mockResponse.data);
        expect(httpService.get).toHaveBeenCalledWith(`https://dog.ceo/api/breed/${breed}/images`);
        done();
      });
    });
  });
}); 