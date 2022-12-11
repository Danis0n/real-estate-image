import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from '../entity/image.entity';

export class ImageRepository {
  @InjectRepository(Image)
  private readonly imageRepository: Repository<Image>;

  public async saveImage(image: Image): Promise<Image> {
    return await this.imageRepository.save(image);
  }

  public async getById(uuid: string): Promise<Image> {
    return await this.imageRepository.findOne({
      where: {
        uuid: uuid,
      },
    });
  }

  public async deleteById(uuid: string) {
    await this.imageRepository.delete(uuid);
  }
}
