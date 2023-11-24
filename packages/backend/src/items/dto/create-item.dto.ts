import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateItemDto {
  @IsString()
  name: string;

  @IsNumber()
  amount: number;

  @IsUUID()
  itemTypeId: string;

  @IsUUID()
  itemCategoryId: string;
}
