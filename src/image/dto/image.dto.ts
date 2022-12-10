export class ImageDto {
  public uuid: string;
  public contentType: string;
  public name: string;
  public size: number;
}

export class ImageCreate {
  public buffer: Buffer;
  public fieldName: string;
  public originalName: string;
  public mimetype: string;
  public size: bigint;
}
