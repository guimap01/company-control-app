import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateItemCategoryDto } from '../dto/create-item-category.dto';
import { findAllPaginated } from 'src/shared/database/findAllPaginated';

@Injectable()
export class ItemCategoriesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createItemCategoryDto: CreateItemCategoryDto) {
    const itemCategory = await this.findByName(createItemCategoryDto.name);
    if (itemCategory) {
      throw new BadRequestException('Item category already exists');
    }
    return this.prismaService.itemCategory.create({
      data: createItemCategoryDto,
    });
  }

  findAll({
    page,
    withDeleted,
    name,
  }: {
    page: number;
    withDeleted?: boolean;
    name?: string;
  }) {
    return findAllPaginated({
      service: this.prismaService.itemCategory,
      page,
      withDeleted,
      where: {
        ...(name ? { name: { contains: name } } : {}),
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.itemCategory.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }
  findByName(name: string) {
    return this.prismaService.itemCategory.findUnique({
      where: {
        name,
      },
    });
  }

  update(id: string, updateItemCategoryDto: CreateItemCategoryDto) {
    return this.prismaService.itemCategory.update({
      where: {
        id,
      },
      data: updateItemCategoryDto,
    });
  }

  remove(id: string) {
    return this.prismaService.itemCategory.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
