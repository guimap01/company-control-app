import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { findAllPaginated } from 'src/shared/database/findAllPaginated';
import { CreateItemTypeDto } from '../dto/create-item-type.dto';
import { UpdateItemTypeDto } from '../dto/update-item-type.dto';

@Injectable()
export class ItemTypesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createItemTypeDto: CreateItemTypeDto) {
    const itemType = await this.findByName(createItemTypeDto.name);
    if (itemType) {
      throw new BadRequestException('Item type already exists');
    }
    return this.prismaService.itemType.create({
      data: createItemTypeDto,
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
      service: this.prismaService.itemType,
      page,
      withDeleted,
      where: {
        ...(name ? { name: { contains: name } } : {}),
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.itemType.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  findByName(name: string) {
    return this.prismaService.itemType.findUnique({
      where: {
        name,
      },
    });
  }

  update(id: string, updateItemTypeDto: UpdateItemTypeDto) {
    return this.prismaService.itemType.update({
      where: {
        id,
      },
      data: updateItemTypeDto,
    });
  }

  remove(id: string) {
    return this.prismaService.itemType.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
