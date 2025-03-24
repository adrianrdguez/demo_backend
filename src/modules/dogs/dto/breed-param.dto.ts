import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class BreedParamDto {
  @ApiProperty({
    description: 'Dog breed name',
    example: 'husky',
  })
  @IsString()
  @IsNotEmpty()
  breed: string;
} 