import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Kích hoạt CORS để client có thể kết nối từ domain khác
    app.enableCors();

    await app.listen(3000);
    console.log(`🚀 Server is running on http://localhost:3000`);
}

bootstrap();
