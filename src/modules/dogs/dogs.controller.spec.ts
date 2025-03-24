import { Test, TestingModule } from '@nestjs/testing';
import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';
import { of } from 'rxjs';

describe('DogsController', () => {
  let controller: DogsController;
  let service: DogsService;

  const mockDogsService = {
    getAllBreeds: jest.fn(),
    getBreedImages: jest.fn(),
    getRandomImageByBreed: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DogsController],
      providers: [
        {
          provide: DogsService,
          useValue: mockDogsService,
        },
      ],
    }).compile();

    controller = module.get<DogsController>(DogsController);
    service = module.get<DogsService>(DogsService);
  });

  it('It should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllBreeds', () => {
    it('It should return all dog breeds', (done) => {
      const mockResult = {
        data: {
          message: { husky: [], labrador: [] },
          status: 'success',
        },
        metadata: {
          page: 1,
          limit: 10,
          totalItems: 2,
          totalPages: 1,
        },
      };

      mockDogsService.getAllBreeds.mockReturnValue(of(mockResult));

      controller.getAllBreeds({ page: 1, limit: 10 }).subscribe((result) => {
        expect(result).toEqual(mockResult);
        expect(service.getAllBreeds).toHaveBeenCalledWith({ page: 1, limit: 10 });
        done();
      });
    });
  });

  describe('getBreedImages', () => {
    it('It should return images for a specific breed', (done) => {
      const breed = 'husky';
      const mockResult = {
        message: ['url1', 'url2'],
        status: 'success',
      };

      mockDogsService.getBreedImages.mockReturnValue(of(mockResult));

      controller.getBreedImages({ breed }).subscribe((result) => {
        expect(result).toEqual(mockResult);
        expect(service.getBreedImages).toHaveBeenCalledWith(breed);
        done();
      });
    });
  });
}); 