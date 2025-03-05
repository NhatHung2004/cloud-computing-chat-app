import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('NestJS API')
        .setDescription('API description')
        .setVersion('1.0')
        .addTag('API')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);

    // Kích hoạt CORS để client có thể kết nối từ domain khác
    app.enableCors();

    await app.listen(3000);
    console.log(`🚀 Server is running on http://localhost:3000`);
}

bootstrap();
