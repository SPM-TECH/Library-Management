import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Service } from 'src/services/entities/service.entity';
import { Login } from 'src/admin/entities/logins.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Service, Login])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
