import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  // Setup Swagger
  setupSwagger(app);
  
  app.enableCors();

  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);
}

bootstrap();
