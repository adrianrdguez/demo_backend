import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DogsModule } from './modules/dogs/dogs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    DogsModule,
  ],
})
export class AppModule {}
