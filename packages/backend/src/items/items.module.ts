import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { ItemTypesController } from './item-types/item-types.controller';
import { ItemTypesService } from './item-types/item-types.service';
import { ItemCategoriesController } from './item-categories/item-categories.controller';
import { ItemCategoriesService } from './item-categories/item-categories.service';
import { DepositsService } from './deposits/deposits.service';
import { WithdrawalsService } from './withdraws/withdrawals.service';
import { DepositsController } from './deposits/deposits.controller';
import { WithdrawalsController } from './withdraws/withdrawals.controller';

@Module({
  controllers: [
    ItemsController,
    ItemTypesController,
    ItemCategoriesController,
    DepositsController,
    WithdrawalsController,
  ],
  providers: [
    ItemsService,
    ItemTypesService,
    ItemCategoriesService,
    PrismaService,
    DepositsService,
    WithdrawalsService,
  ],
})
export class ItemsModule {}
