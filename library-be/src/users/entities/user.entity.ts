import { Feedback } from 'src/feedbacks/entities/feedback.entity';
import { Service } from '../../services/entities/service.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_name: string;

  @Column({ unique: true })
  nic_number: string;

  @Column({ unique: true })
  index_number: string;

  @Column()
  faculty: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true, default: null })
  updated_at: Date;

  @ManyToMany(() => Service, (service) => service.users)
  services: Service[];

  @OneToMany(() => Feedback, fd => fd.user)
  feedbacks: Feedback[]
}
