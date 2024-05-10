import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, MoreThan } from 'typeorm';
import { User } from './entities/user.entity';
import { Login } from '../admin/entities/logins.entity';
import { UpdateUserServiceDto } from './dto/update-user-service.dto';
import { Service } from '../services/entities/service.entity';
import { endOfYesterday, format } from 'date-fns';
import { faker } from '@faker-js/faker';

//const SKIP_LIMIT = 5

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
    @InjectRepository(Login)
    private loginRepository: Repository<Login>,
  ) { }

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save({ ...createUserDto, updated_at: null });
  }

  async bulkupload(students: CreateUserDto[]) {
    try {
      const promises = students.map(async (st) => {
        try {
          const success = await this.usersRepository.save(st);
          return { success, error: null };
        } catch (error) {
          return { success: null, error };
        }
      });
      const res = await Promise.all(promises);

      return res.filter((r) => r.success !== null);
    } catch (error) {
      return {
        success: null,
        error,
      };
    }
  }

  findAll(page: number = 0) {
    return this.usersRepository.find({
      order: {
        created_at: 'DESC',
      },
    });
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

  async findOneByNIC(nic: string) {
    const user = await this.usersRepository.findOne({
      where: {
        nic_number: nic,
      },
    });

    const date_exist = await this.loginRepository.findOne({
      where: {
        date: format(new Date(), 'dd-LL-yyyy'),
      },
    });

    if (date_exist) {
      date_exist.count = date_exist.count + 1;
      await this.loginRepository.save(date_exist);
    } else {
      await this.loginRepository.save({
        date: format(new Date(), 'dd-LL-yyyy'),
        count: 1,
      });
    }

    user.updated_at = new Date();
    return this.usersRepository.save(user);
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

  getAttendance() {
    return this.usersRepository.find({
      where: {
        updated_at: MoreThan(new Date(endOfYesterday())),
      },
    });
  }

  async groupByFaculty() {
    const animal_science = await this.usersRepository.countBy({
      faculty: 'Animal Science & Export Agriculture',
    });
    const applied_sciences = await this.usersRepository.countBy({
      faculty: 'Applied Sciences',
    });
    const management = await this.usersRepository.countBy({
      faculty: 'Management Studies',
    });
    const techno = await this.usersRepository.countBy({
      faculty: 'Technological Studies',
    });
    const pg = await this.usersRepository.countBy({
      faculty: 'Post Graduates',
    });

    const astaff = await this.usersRepository.countBy({
      faculty: 'Academic Staff',
    });
    const nass = await this.usersRepository.countBy({
      faculty: 'Non Academic Staff',
    });
    const other = await this.usersRepository.countBy({
      faculty: 'Others',
    });
    const medicine = await this.usersRepository.countBy({
      faculty: 'Medicine',
    });



    const dataPie = [
      {
        name: 'Animal Science & Export Agriculture',
        value: animal_science || 0,
      },
      {
        name: 'Applied Sciences',
        value: applied_sciences || 0,
      },
      {
        name: 'Management Studies',
        value: management || 0,
      },
      {
        name: 'Technological Studies',
        value: techno || 0,
      },
      {
        name: 'Medicine',
        value: medicine || 0,
      },
      {
        name: 'Post Graduates',
        value: pg || 0,
      },
      {
        name: 'Academic Staff',
        value: astaff || 0,
      },
      {
        name: 'Non Academic Staff',
        value: nass || 0,
      },
      {
        name: 'Other',
        value: other || 0,
      },
    ];

    return dataPie;
  }

  async seed() {
    const users: CreateUserDto[] = [];

    try {
      for (let i = 0; i <= 10; i++) {
        users.push({
          user_name: faker.person.firstName(),
          index_number: faker.string.numeric({ length: 5 }),
          nic_number: faker.string.numeric({ length: 9 }),
          faculty: faker.helpers.arrayElement([
            'science',
            'arts',
            'management',
            'medicine',
          ]),
        });
      }
      const promises = users.map((user) => this.usersRepository.save(user));
      await Promise.all(promises);
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
      };
    }
  }
}
