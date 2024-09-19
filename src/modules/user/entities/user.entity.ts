import { Pokemon } from '../../../modules/pokemon/entities/pokemon.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ unique: true })
  email: string;

  @ManyToMany(() => Pokemon, { nullable: false })
  @JoinTable({ name: 'user_favorite_pokemons' })
  favoritePokemons: Pokemon[];
}
