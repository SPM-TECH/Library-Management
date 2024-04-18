import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from './entities/feedback.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class FeedbacksService {

  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  async create(createFeedbackDto: CreateFeedbackDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { nic_number: createFeedbackDto.nic_number }
      })

      if (!user) {
        throw new NotFoundException("student not found")
      }

      await this.feedbackRepository.save({
        content: createFeedbackDto.content,
        user
      })

      return {
        status: 201,
        error: null
      }

    } catch (error) {
      return {
        status: 400,
        error
      }
    }
  }

  findAll() {
    return this.feedbackRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} feedback`;
  }



  remove(id: number) {
    return `This action removes a #${id} feedback`;
  }
}
