import { Controller, Get, Param } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { BreedParamDto } from './dto/breed-param.dto';
import { DogBreeds, DogImages, DogRandomImage } from './interfaces/dog.interface';
import { Observable } from 'rxjs';

@ApiTags('dogs')
@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @Get('breeds')
  @ApiOperation({ summary: 'Get all dog breeds' })
  @ApiResponse({
    status: 200,
    description: 'List of all dog breeds',
    type: Object
  })
  getAllBreeds(): Observable<DogBreeds> {
    return this.dogsService.getAllBreeds();
  }

  @Get('breed/:breed/images')
  @ApiOperation({ summary: 'Get all images for a specific breed' })
  @ApiParam({ name: 'breed', description: 'Dog breed name', type: String })
  @ApiResponse({
    status: 200,
    description: 'List of all images for the specified breed',
    type: Object
  })
  getBreedImages(@Param() params: BreedParamDto): Observable<DogImages> {
    return this.dogsService.getBreedImages(params.breed);
  }

  @Get('breed/:breed/random')
  @ApiOperation({ summary: 'Get a random image for a specific breed' })
  @ApiParam({ name: 'breed', description: 'Dog breed name', type: String })
  @ApiResponse({
    status: 200,
    description: 'Random image URL for the specified breed',
    type: Object
  })
  getRandomImageByBreed(@Param() params: BreedParamDto): Observable<DogRandomImage> {
    return this.dogsService.getRandomImageByBreed(params.breed);
  }
} 