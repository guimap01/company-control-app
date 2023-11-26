import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateItemTypeDto } from '../dto/create-item-type.dto';
import { UpdateItemTypeDto } from '../dto/update-item-type.dto';
import { ItemTypesService } from './item-types.service';

@Controller('item-types')
export class ItemTypesController {
  constructor(private readonly itemTypesService: ItemTypesService) {}

  @Post()
  create(@Body() createItemTypeDto: CreateItemTypeDto) {
    return this.itemTypesService.create(createItemTypeDto);
  }

  @Get()
  findAll(
    @Query() query: { page: number; withDeleted?: boolean; name?: string },
  ) {
    return this.itemTypesService.findAll(query);
  }

  @Get('options')
  findAllOptions() {
    return this.itemTypesService.findAllOptions();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemTypesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateItemTypeDto: UpdateItemTypeDto,
  ) {
    return this.itemTypesService.update(id, updateItemTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemTypesService.remove(id);
  }
}
