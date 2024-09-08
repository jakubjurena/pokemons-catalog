import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Pokemon } from './pokemon.entity';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  classificationId: number;

  @Column()
  name: string;

  @OneToMany(() => Pokemon, (pokemon) => pokemon.classification)
  pokemons: Pokemon[];
}
