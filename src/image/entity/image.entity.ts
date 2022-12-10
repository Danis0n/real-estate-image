import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('image')
export class Image extends BaseEntity {
  @PrimaryColumn({ generated: 'uuid', name: 'image_id' })
  public uuid!: string;

  @Column({
    name: 'content_type',
    nullable: false,
    type: 'varchar',
  })
  public contentType!: string;

  @Column({
    name: 'data',
    nullable: false,
    type: 'bytea',
  })
  public data!: Buffer;

  @Column({
    name: 'image_name',
    nullable: false,
    type: 'varchar',
  })
  public name!: string;

  @Column({
    name: 'image_size',
    nullable: false,
    type: 'bigint',
  })
  public size!: bigint;
}
