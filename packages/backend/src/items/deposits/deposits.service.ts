import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateDepositDto } from '../dto/create-deposit.dto';

@Injectable()
export class DepositsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: CreateDepositDto) {
    return this.prismaService.$transaction([
      this.prismaService.deposit.create({ data }),
      this.prismaService.item.update({
        where: { id: data.itemId },
        data: { amount: { increment: data.amount } },
      }),
    ]);
  }
}
