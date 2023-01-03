import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  ImageDeleteRequest,
  ImageDeleteResponse,
  ImagePostResponse,
  ImagesDeleteRequest,
  ImagesDeleteResponse,
  ImageUserResponse,
  ImageViewRequest,
  ImageViewResponse,
} from './proto/image.pb';
import { ImageRepository } from './repository/image.repository';
import { Image } from './entity/image.entity';
import { ImageMapper } from './mapper/image.mapper';
import { ImageCreateDto, ImagePostDto } from './dto/image.dto';

@Injectable()
export class ImageService {
  @Inject(ImageRepository)
  private readonly imageRepository: ImageRepository;

  @Inject(ImageMapper)
  private readonly imageMapper: ImageMapper;

  public async uploadToUser(dto: ImageCreateDto): Promise<ImageUserResponse> {
    let image: Image = this.imageMapper.mapToNewImage(dto);
    image = await this.imageRepository.saveImage(image);
    return { status: HttpStatus.OK, error: null, UUID: image.uuid };
  }

  public async uploadToPost(dto: ImagePostDto): Promise<ImagePostResponse> {
    const imagesUuids: string[] = [];
    for (const dtoImage of dto.images) {
      let image: Image = this.imageMapper.mapToNewImage(dtoImage);
      image = await this.imageRepository.saveImage(image);
      imagesUuids.push(image.uuid);
    }
    return {
      error: null,
      status: HttpStatus.OK,
      UUID: dto.UUID,
      imagesUuids: imagesUuids,
    };
  }

  public async getById(dto: ImageViewRequest): Promise<ImageViewResponse> {
    const image = await this.imageRepository.getById(dto.UUID);
    return { buffer: image.data.toString('base64') };
  }

  public async deleteById(
    dto: ImageDeleteRequest,
  ): Promise<ImageDeleteResponse> {
    await this.imageRepository.deleteById(dto.UUID);
    return { status: HttpStatus.OK, error: null };
  }

  public async deleteMany(
    dto: ImagesDeleteRequest,
  ): Promise<ImagesDeleteResponse> {
    for (const uuid of dto.UUIDs) {
      const image: Image = await this.imageRepository.getById(uuid);
      if (image == null)
        return {
          error: 'Изображение не было найдено',
          status: HttpStatus.BAD_REQUEST,
        };
      await this.imageRepository.deleteById(uuid);
    }

    return { error: null, status: HttpStatus.OK };
  }
}
