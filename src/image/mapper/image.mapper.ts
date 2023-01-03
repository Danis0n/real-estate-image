import { Image } from '../entity/image.entity';
import { ImageCreateDto } from '../dto/image.dto';
import { v4 as uuidv4 } from 'uuid';

export class ImageMapper {
  public mapToNewImage(dto: ImageCreateDto): Image {
    const image: Image = new Image();
    image.size = dto.size;
    image.data = dto.buffer;
    image.name = dto.originalName;
    image.contentType = dto.mimetype;
    image.uuid = uuidv4();
    return image;
  }
}
