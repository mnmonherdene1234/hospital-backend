import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'http';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TreatmentTimesService } from './treatment-times.service';

@WebSocketGateway({ cors: true })
export class NotificationGateway {
  constructor(private readonly treatmentTimesService: TreatmentTimesService) {}

  @WebSocketServer()
  server: Server;

  @Cron(CronExpression.EVERY_SECOND)
  async sendNotification() {
    const times = await this.treatmentTimesService.findNotificationTimes();
    if (times.length == 0) return;

    this.server.emit('notification', '');
  }
}
