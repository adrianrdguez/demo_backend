import { Module } from '@nestjs/common';
import { DogsModule } from './modules/dogs/dogs.module';

@Module({
  imports: [DogsModule],
})
export class AppModule {}
