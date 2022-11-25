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

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string) {
    this.server.emit('message', message);
  }

  @Cron(CronExpression.EVERY_SECOND)
  async sendMessages() {
    const times = await this.treatmentTimesService.findNotificationTimes();
    if (!times) return;

    times.forEach((time) => {
      this.server.emit('message', JSON.stringify(time));
    });
  }
}
