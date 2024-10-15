import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pronunciation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  word: string;

  @Column('jsonb')
  data: any;

  @Column()
  createdAt: Date;
}
