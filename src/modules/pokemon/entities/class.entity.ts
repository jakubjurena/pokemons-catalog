import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Pokemon } from './pokemon.entity';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  classId: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Pokemon, (pokemon) => pokemon.classification)
  pokemons: Pokemon[];
}
