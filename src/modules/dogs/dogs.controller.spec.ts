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
        message: { husky: [], labrador: [] },
        status: 'success',
      };

      mockDogsService.getAllBreeds.mockReturnValue(of(mockResult));

      controller.getAllBreeds().subscribe((result) => {
        expect(result).toEqual(mockResult);
        expect(service.getAllBreeds).toHaveBeenCalled();
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