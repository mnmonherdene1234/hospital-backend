import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { HttpService } from '@nestjs/axios';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly httpService: HttpService,
    private readonly mailService: MailService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }

  async profile(id: string) {
    return await this.usersService.findOne(id);
  }

  async updateProfile(id: string, updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  async resetPassword(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException();
    const password = Math.floor(Math.random() * 100000000);
    const updateUser: UpdateUserDto = new UpdateUserDto();
    updateUser.password = password.toString();

    await this.mailService.sendUsernamePassword(
      user.email,
      user.username,
      password.toString(),
    );

    await this.usersService.update(user.id, updateUser);

    return {};
  }
}
