import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isMatch = await this.usersService.comparePasswords(
      pass,
      user.password,
    );
    if (!isMatch) {
      throw new BadRequestException('Invalid credentials');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id, roles: [user.role] };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
