import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { findAllPaginated } from 'src/shared/database/findAllPaginated';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        password: createUserDto.password,
        role: createUserDto.role,
      },
    });
  }

  findAll({
    page,
    withDeleted,
    name,
  }: {
    page: number;
    withDeleted?: boolean;
    name: string;
  }) {
    return findAllPaginated<User>({
      service: this.prismaService.user,
      page,
      withDeleted,
      where: {
        name: {
          contains: name,
        },
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });
  }

  findByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  findOne(id: string) {
    return this.prismaService.user.findUniqueOrThrow({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        email: updateUserDto.email,
        name: updateUserDto.name,
        password: updateUserDto.password,
        role: updateUserDto.role,
      },
    });

    return user;
  }

  remove(id: string) {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async hashPassword(password: string) {
    return hash(password, 10);
  }

  async comparePasswords(password: string, hashedPassword: string) {
    return compare(password, hashedPassword);
  }
}
