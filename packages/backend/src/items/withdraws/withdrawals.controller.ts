import { Body, Controller, Post, Request } from '@nestjs/common';
import { WithdrawalsService } from './withdrawals.service';
import { CreateWithdrawalPayloadDto } from '../dto/create-Withdrawal.dto';

@Controller('withdrawals')
export class WithdrawalsController {
  constructor(private readonly withdrawalService: WithdrawalsService) {}
  @Post()
  async create(@Body() data: CreateWithdrawalPayloadDto, @Request() req: any) {
    const userId = req.user.userId;
    return this.withdrawalService.create({
      ...data,
      userId,
    });
  }
}
