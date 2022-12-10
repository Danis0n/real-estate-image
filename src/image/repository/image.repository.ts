import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from '../entity/image.entity';

export class ImageRepository {
  @InjectRepository(Image)
  private readonly imageRepository: Repository<Image>;

  public async saveImage(image: Image): Promise<Image> {
    return await this.imageRepository.save(image);
  }
}
