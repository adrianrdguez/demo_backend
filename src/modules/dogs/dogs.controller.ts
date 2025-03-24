import { Controller, Get, Param } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('dogs')
@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @Get('breeds')
  @ApiOperation({ summary: 'Get all dog breeds' })
  getAllBreeds() {
    return this.dogsService.getAllBreeds();
  }

  @Get('breed/:breed/images')
  @ApiOperation({ summary: 'Get all images for a specific breed' })
  @ApiParam({ name: 'breed', description: 'Dog breed name' })
  getBreedImages(@Param('breed') breed: string) {
    return this.dogsService.getBreedImages(breed);
  }

  @Get('breed/:breed/random')
  @ApiOperation({ summary: 'Get a random image for a specific breed' })
  @ApiParam({ name: 'breed', description: 'Dog breed name' })
  getRandomImageByBreed(@Param('breed') breed: string) {
    return this.dogsService.getRandomImageByBreed(breed);
  }
} 