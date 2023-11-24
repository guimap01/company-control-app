import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ItemCategoriesService } from './item-categories.service';
import { CreateItemCategoryDto } from '../dto/create-item-category.dto';

@Controller('item-categories')
export class ItemCategoriesController {
  constructor(private readonly itemCategoriesService: ItemCategoriesService) {}

  @Post()
  create(@Body() createItemCategoryDto: CreateItemCategoryDto) {
    return this.itemCategoriesService.create(createItemCategoryDto);
  }

  @Get()
  findAll(
    @Query() query: { page: number; withDeleted?: boolean; name?: string },
  ) {
    return this.itemCategoriesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemCategoriesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateItemCategoryDto: CreateItemCategoryDto,
  ) {
    return this.itemCategoriesService.update(id, updateItemCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemCategoriesService.remove(id);
  }
}
