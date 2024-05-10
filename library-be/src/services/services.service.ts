import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) { }

  create(createServiceDto: CreateServiceDto) {
    return this.serviceRepository.save(createServiceDto);
  }

  findAll() {
    return this.serviceRepository.find();
  }

  findOne(id: number) {
    return this.serviceRepository.findOne({
      where: {
        id,
      },
    });
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return this.serviceRepository.save({ id, ...updateServiceDto });
  }

  remove(id: number) {
    return this.serviceRepository.delete(id);
  }
  async getServicesCount() {
    const services = await this.serviceRepository.find({
      relations: {
        users: true,
      },
    });
    const res = services.map((service) => ({
      service: service.name,
      count: service.users.length,
    }));
    return res;
  }
  async seed() {
    const services = [
      'Borrowing Books',
      'Reference & Study',
      'Information Commons',
      'Research, Periodicals & Thesis',
      'Newspaper & Recreation',
      'Wifi/Entertainment',
      'ICT & E-Resources',
      'Workshops & Seminars',
      'Others',
    ];
    try {
      const promises = services.map(
        async (service) =>
          await this.serviceRepository.save({ name: service }),
      );
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
