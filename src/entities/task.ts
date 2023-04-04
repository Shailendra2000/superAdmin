import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TaskStatus,User } from './';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar',{length:100})
  title: string;
  
  @Column('varchar',{length:200})
  desc:string;

  @ManyToOne(type => TaskStatus, taskStatus => taskStatus.tasks ,{eager:true})
  status: TaskStatus;

  @Column('boolean')
  isActive:boolean;
  
  @ManyToOne(type => User)
  createdBy:User;

  @Column('date')
  createdAt:Date;

  @ManyToOne(type => User)
  updatedBy:User;

  @Column('date')
  updatedAt:Date
}