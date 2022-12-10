import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { IMAGE_SERVICE_NAME, ImageUserResponse } from './proto/image.pb';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  @Inject(ImageService)
  private readonly imageService: ImageService;

  @GrpcMethod(IMAGE_SERVICE_NAME, 'ImageUploadUser')
  private async uploadToUser(payload): Promise<ImageUserResponse> {
    return this.imageService.uploadToUser(payload);
  }
}
