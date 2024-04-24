import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder().setTitle("Интеренет-магазин").setDescription("Документация").setVersion("1.0.0").build();
  const document= SwaggerModule.createDocument(app,config);
  SwaggerModule.setup("/docs",app,document);
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  });
  await app.listen(5000);
}
bootstrap();
