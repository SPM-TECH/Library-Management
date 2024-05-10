import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ServicesModule } from './services/services.module';
import { Service } from './services/entities/service.entity';
import { AdminModule } from './admin/admin.module';
import { Login } from './admin/entities/logins.entity';
import { ConfigModule } from '@nestjs/config';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { Feedback } from './feedbacks/entities/feedback.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      renderPath: '/*',
      exclude: ["api/*"]
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.PG_URL,
      entities: [User, Service, Login, Feedback],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ServicesModule,
    AdminModule,
    FeedbacksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
