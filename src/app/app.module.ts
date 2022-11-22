import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersModule } from './customers/customers.module';
import { DoctorsModule } from './doctors/doctors.module';
import { LoggerMiddleware } from './utils/logger.middleware';
import { ServicesModule } from './services/services.module';
import { TreatmentsModule } from './treatments/treatments.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { TreatmentTimesModule } from './treatment-times/treatment-times.module';
import { ResourcesModule } from './resources/resources.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      dbName: process.env.DATABASE_NAME,
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    CacheModule.register({
      ttl: 3,
      max: 30,
    }),
    AuthModule,
    UsersModule,
    CustomersModule,
    DoctorsModule,
    ServicesModule,
    TreatmentsModule,
    TreatmentTimesModule,
    ResourcesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
