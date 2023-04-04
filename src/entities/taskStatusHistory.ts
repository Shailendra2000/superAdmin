import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Task } from './task';
import { TaskStatus } from './taskStatus';
import { User } from './user';

@Entity()
export class TaskStatusHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Task)
  @JoinColumn()
  task: Task;

  @ManyToOne(() => TaskStatus)
  @JoinColumn()
  fromStatus: TaskStatus;

  @ManyToOne(() => TaskStatus)
  @JoinColumn()
  toStatus: TaskStatus;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;
}