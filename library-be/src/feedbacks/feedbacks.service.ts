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
    private userRepository: Repository<User>,
  ) { }

  async create(createFeedbackDto: CreateFeedbackDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { nic_number: createFeedbackDto.nic_number },
      });

      if (!user) {
        throw new NotFoundException('student not found');
      }

      await this.feedbackRepository.save({
        content: createFeedbackDto.content,
        user,
      });

      return {
        status: 201,
        error: null,
      };
    } catch (error) {
      return {
        status: 400,
        error,
      };
    }
  }

  findAll() {
    return this.feedbackRepository.find();
  }

  async getRatings() {
    const feedBacks = await this.findAll();
    const ratings = {
      Excellent: 0,
      'Very Good': 0,
      Good: 0,
      Satisfactory: 0,
      Unsatisfactory: 0,
    };

    feedBacks.forEach((f) => {
      if (f.content === 'Excellent') {
        ratings['Excellent'] = ratings['Excellent'] + 1;
      }

      if (f.content === 'Very Good') {
        ratings['Very Good'] = ratings['Very Good'] + 1;
      }

      if (f.content === 'Excellent') {
        ratings['Excellent'] = ratings['Excellent'] + 1;
      }

      if (f.content === 'Good') {
        ratings['Good'] = ratings['Good'] + 1;
      }

      if (f.content === 'Satisfactory') {
        ratings['Satisfactory'] = ratings['Satisfactory'] + 1;
      }

      if (f.content === 'Unsatisfactory') {
        ratings['Unsatisfactory'] = ratings['Unsatisfactory'] + 1;
      }
    });

    const ratingsArr = [];

    Object.keys(ratings).forEach((k, i) => {
      ratingsArr.push({
        id: i,
        text: k,
        count: ratings[k],
      });
    });

    return ratingsArr;
  }

  findOne(id: number) {
    return `This action returns a #${id} feedback`;
  }

  remove(id: number) {
    return `This action removes a #${id} feedback`;
  }
}
