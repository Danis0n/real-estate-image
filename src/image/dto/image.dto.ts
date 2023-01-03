import { ImageCreate, ImagePostRequest } from '../proto/image.pb';

export class ImageDto {
  public uuid: string;
  public contentType: string;
  public name: string;
  public size: number;
}

export class ImageCreateDto implements ImageCreate {
  public buffer: Buffer;
  public fieldName: string;
  public originalName: string;
  public mimetype: string;
  public size: number;
}

export class ImagePostDto implements ImagePostRequest {
  images: ImageCreateDto[];
  UUID: string;
}
