import { Entity, PrimaryGeneratedColumn, Column,OneToMany, ManyToOne } from 'typeorm';
import { Task,User } from './';


@Entity()
export class TaskStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar',{length:100,unique:true})
  status: string; 

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

  @OneToMany(type => Task, task => task.status)
  tasks: Task[];
}