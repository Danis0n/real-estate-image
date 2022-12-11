import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { INestMicroservice, ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { protobufPackage } from './image/proto/image.pb';

async function bootstrap() {
  const app: INestMicroservice = await NestFactory.createMicroservice(
    AppModule,
    {
      cors: {
        origin: 'http://localhost:3001',
        credentials: true,
      },
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:50053',
        package: protobufPackage,
        protoPath: join('node_modules/proto-config/proto/image.proto'),
      },
    },
  );

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen();
}
bootstrap();
