import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [DogsController],
  providers: [DogsService],
})
export class DogsModule {}