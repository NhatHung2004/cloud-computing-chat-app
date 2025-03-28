import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 3000;

    const config = new DocumentBuilder()
        .setTitle('NestJS API')
        .setDescription('API description')
        .setVersion('1.0')
        .addTag('API')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);

    app.enableCors();

    await app.listen(PORT);
    console.log(`🚀 Server running on port ${PORT}`);
}

bootstrap();
