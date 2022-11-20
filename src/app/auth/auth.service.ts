import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly httpService: HttpService,
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

  async resetPassword(phone: string) {
    const user = await this.usersService.findByPhone(phone);
    if (!user) throw new UnauthorizedException();
    const password = Math.floor(Math.random() * 100000000);
    const updateUser: UpdateUserDto = new UpdateUserDto();
    updateUser.password = password.toString();
    await this.usersService.update(user.id, updateUser);
    const message = `username: ${user.username} password: ${password}`;

    await this.httpService.axiosRef.get(
      `http://web2sms.skytel.mn/apiSend?token=de5ee98b9cba190ab23863f9d385244000a15947&sendto=${phone}&message=${message}`,
    );
    return password;
  }
}
