import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  IMAGE_SERVICE_NAME,
  ImageDeleteResponse,
  ImagePostResponse,
  ImagesDeleteResponse,
  ImageUserResponse,
  ImageViewResponse,
} from './proto/image.pb';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  @Inject(ImageService)
  private readonly imageService: ImageService;

  @GrpcMethod(IMAGE_SERVICE_NAME, 'ImageUploadUser')
  private async uploadToUser(payload): Promise<ImageUserResponse> {
    return this.imageService.uploadToUser(payload);
  }

  @GrpcMethod(IMAGE_SERVICE_NAME, 'ImageUploadPost')
  private async uploadToPost(payload): Promise<ImagePostResponse> {
    return this.imageService.uploadToPost(payload);
  }

  @GrpcMethod(IMAGE_SERVICE_NAME, 'ImageView')
  private async getById(payload): Promise<ImageViewResponse> {
    return this.imageService.getById(payload);
  }

  @GrpcMethod(IMAGE_SERVICE_NAME, 'ImageDelete')
  private async deleteById(payload): Promise<ImageDeleteResponse> {
    return this.imageService.deleteById(payload);
  }

  @GrpcMethod(IMAGE_SERVICE_NAME, 'ImagesDelete')
  private async deleteMany(payload): Promise<ImagesDeleteResponse> {
    return this.imageService.deleteMany(payload);
  }
}
