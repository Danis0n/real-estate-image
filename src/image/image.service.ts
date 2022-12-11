import { Inject, Injectable } from '@nestjs/common';
import {
  ImageUserResponse,
  ImageViewRequest,
  ImageViewResponse,
} from './proto/image.pb';
import { ImageRepository } from './repository/image.repository';
import { Image } from './entity/image.entity';
import { ImageMapper } from './mapper/image.mapper';

@Injectable()
export class ImageService {
  @Inject(ImageRepository)
  private readonly imageRepository: ImageRepository;

  @Inject(ImageMapper)
  private readonly imageMapper: ImageMapper;

  public async uploadToUser(payload): Promise<ImageUserResponse> {
    let image: Image = this.imageMapper.mapToNewImage(payload);
    image = await this.imageRepository.saveImage(image);
    return { status: '200', error: null, uuid: image.uuid };
  }

  public async getById(payload: ImageViewRequest): Promise<ImageViewResponse> {
    const image = await this.imageRepository.getById(payload.uuid);
    return { buffer: image.data.toString('base64') };
  }
}
