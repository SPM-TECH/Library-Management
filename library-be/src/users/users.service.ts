import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserServiceDto } from './dto/update-user-service.dto';
import { Service } from '../services/entities/service.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });
    return this.usersRepository.save({ ...user, ...updateUserDto });
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }

  findOneByNIC(nic: string) {
    return this.usersRepository.findOne({
      where: {
        nic_number: nic,
      },
    });
  }

  async updateOptions(id: string, updateUserServiceDto: UpdateUserServiceDto) {
    const services = await this.serviceRepository.find({
      where: {
        id: In(updateUserServiceDto.services),
      },
    });
    const user = await this.usersRepository.findOne({
      where: {
        nic_number: id,
      },
    });

    user.services = services;
    return this.usersRepository.save(user);
  }
}
