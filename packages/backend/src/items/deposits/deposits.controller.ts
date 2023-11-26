import { Body, Controller, Post, Request } from '@nestjs/common';
import { DepositsService } from './deposits.service';
import { CreateDepositPayloadDto } from '../dto/create-deposit.dto';

@Controller('deposits')
export class DepositsController {
  constructor(private readonly depositService: DepositsService) {}

  @Post()
  async create(@Body() data: CreateDepositPayloadDto, @Request() req: any) {
    const { user } = req;

    return this.depositService.create({
      amount: data.amount,
      itemId: data.itemId,
      userId: user.userId,
    });
  }
}
