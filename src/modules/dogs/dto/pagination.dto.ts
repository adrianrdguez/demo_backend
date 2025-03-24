import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationQueryDto {
  @ApiProperty({
    description: 'Page number (starts from 1)',
    default: 1,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiProperty({
    description: 'Number of items per page',
    default: 10,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 10;

  @ApiProperty({
    description: 'Search term to filter breeds',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T;
  metadata: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
} 