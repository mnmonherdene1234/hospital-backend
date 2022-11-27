import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TreatmentTimesService } from './treatment-times.service';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: true })
export class NotificationGateway {
  constructor(private readonly treatmentTimesService: TreatmentTimesService) {}

  @WebSocketServer()
  server: Server;

  @Cron(CronExpression.EVERY_30_SECONDS)
  async sendNotification() {
    const times = await this.treatmentTimesService.findNotificationTimes();
    if (times.length == 0) return;

    this.server.emit('notification', '');
  }
}
