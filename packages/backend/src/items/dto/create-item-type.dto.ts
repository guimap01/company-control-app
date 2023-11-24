import { IsString, IsUUID } from 'class-validator';

export class CreateItemTypeDto {
  @IsString()
  name: string;

  @IsUUID()
  itemCategoryId: string;
}
