import { Service } from 'src/services/entities/service.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_name: string;

  @Column({ unique: true })
  nic_number: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToMany(() => Service)
  @JoinTable()
  services: Service[];
}
