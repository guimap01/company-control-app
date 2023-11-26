import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateWithdrawalDto } from '../dto/create-Withdrawal.dto';

@Injectable()
export class WithdrawalsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateWithdrawalDto) {
    const item = await this.prismaService.item.findUnique({
      where: { id: data.itemId },
    });
    if (item.amount < data.amount) {
      throw new BadRequestException(
        'Não há itens suficientes para realizar o saque',
      );
    }
    return this.prismaService.$transaction([
      this.prismaService.withdrawal.create({ data }),
      this.prismaService.item.update({
        where: { id: data.itemId },
        data: { amount: { decrement: data.amount } },
      }),
    ]);
  }
}
