import { IsNumber, IsUUID } from 'class-validator';

export class CreateDepositPayloadDto {
  @IsNumber()
  amount: number;

  @IsUUID()
  itemId: string;
}

export class CreateDepositDto extends CreateDepositPayloadDto {
  @IsUUID()
  userId: string;
}
