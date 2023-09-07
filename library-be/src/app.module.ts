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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
       
      entities: [User, Service, Login],
      synchronize: true,
      url:'postgres://library_managment_user:2jpyJq2lsqb4TNIcubobDQIMRcz9Eeel@dpg-cjsmsoj6fquc739sh8rg-a.oregon-postgres.render.com/library_managment',
      ssl:{
        rejectUnauthorized:true
      }
    }),
    UsersModule,
    AuthModule,
    ServicesModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
