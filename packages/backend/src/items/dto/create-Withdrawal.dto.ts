import { IsNumber, IsUUID } from 'class-validator';

export class CreateWithdrawalPayloadDto {
  @IsUUID()
  itemId: string;

  @IsNumber()
  amount: number;
}

export class CreateWithdrawalDto extends CreateWithdrawalPayloadDto {
  @IsUUID()
  userId: string;
}
