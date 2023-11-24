import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { ItemTypesController } from './item-types/item-types.controller';
import { ItemTypesService } from './item-types/item-types.service';
import { ItemCategoriesController } from './item-categories/item-categories.controller';
import { ItemCategoriesService } from './item-categories/item-categories.service';

@Module({
  controllers: [ItemsController, ItemTypesController, ItemCategoriesController],
  providers: [
    ItemsService,
    ItemTypesService,
    ItemCategoriesService,
    PrismaService,
  ],
})
export class ItemsModule {}
