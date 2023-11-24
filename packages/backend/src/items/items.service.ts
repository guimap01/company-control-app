import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { findAllPaginated } from 'src/shared/database/findAllPaginated';

@Injectable()
export class ItemsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createItemDto: CreateItemDto) {
    const item = await this.findByName(createItemDto.name);
    if (item) {
      throw new BadRequestException('Item already exists');
    }
    return this.prismaService.item.create({
      data: createItemDto,
    });
  }

  findAll({
    page,
    withDeleted,
    name,
    itemTypeId,
    itemCategoryId,
  }: {
    page: number;
    withDeleted?: boolean;
    name?: string;
    itemTypeId?: string;
    itemCategoryId?: string;
  }) {
    return findAllPaginated({
      service: this.prismaService.item,
      page,
      withDeleted,
      where: {
        ...(name ? { name: { contains: name } } : {}),
        ...(itemTypeId ? { itemTypeId } : {}),
        ...(itemCategoryId ? { itemCategoryId } : {}),
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.item.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  findByName(name: string) {
    return this.prismaService.item.findUnique({
      where: {
        name,
      },
    });
  }

  update(id: string, updateItemDto: UpdateItemDto) {
    return this.prismaService.item.update({
      where: {
        id,
      },
      data: updateItemDto,
    });
  }

  remove(id: string) {
    return this.prismaService.item.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
