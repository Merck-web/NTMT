import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors()
    const config = new DocumentBuilder()
        .setTitle('НТМТ сервер')
        .setDescription('Документация')
        .setVersion('alpha')
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)
    await app.listen(8000);
}

bootstrap();
