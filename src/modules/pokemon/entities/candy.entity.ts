import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Candy {
  @PrimaryGeneratedColumn()
  candyId: number;

  @Column()
  name: string;
}
