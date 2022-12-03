import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUsernamePassword(
    email: string,
    username: string,
    password: string,
  ) {
    return await this.mailerService.sendMail({
      to: email,
      subject: 'Нэвтрэх мэдээлэл',
      template: 'login-info',
      context: {
        username,
        password,
      },
    });
  }
}
