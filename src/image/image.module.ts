import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { Image } from './entity/image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageMapper } from './mapper/image.mapper';
import { ImageRepository } from './repository/image.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  controllers: [ImageController],
  providers: [ImageService, ImageMapper, ImageRepository],
})
export class ImageModule {}
