import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Classification } from './classification.entity';
import { PokemonType } from '../../pokemon-type/entities/pokemon-type.entity';
import { Class } from './class.entity';
import { Candy } from './candy.entity';

@Entity()
export class Pokemon {
  @PrimaryGeneratedColumn()
  pokemonId: number;

  @Column()
  name: string;

  @ManyToOne(
    () => Classification,
    (classification) => classification.pokemons,
    { nullable: false, eager: true },
  )
  classification: Classification;

  @ManyToOne(() => Class, (classType) => classType.pokemons, {
    nullable: true,
    eager: true,
  })
  class?: Class;

  @ManyToMany(() => PokemonType, { nullable: false, eager: true })
  @JoinTable({ name: 'pokemon_types' })
  types: PokemonType[];

  @ManyToMany(() => PokemonType, { eager: true })
  @JoinTable({ name: 'pokemon_resistances' })
  resistant: PokemonType[];

  @ManyToMany(() => PokemonType, { eager: true })
  @JoinTable({ name: 'pokemon_weaknesses' })
  weaknesses: PokemonType[];

  @Column()
  minWeight: number;

  @Column()
  maxWeight: number;

  @Column()
  minHeight: number;

  @Column()
  maxHeight: number;

  @Column()
  fleeRate: number;

  @Column('int')
  maxCP: number;

  @Column('int')
  maxHP: number;

  @ManyToMany(() => Pokemon)
  @JoinTable({ name: 'pokemon_previous_evolutions' })
  previousEvolutions: Pokemon[];

  @ManyToMany(() => Pokemon)
  @JoinTable({ name: 'pokemon_next_evolutions' })
  nextEvolutions: Pokemon[];

  @Column()
  evolutionRequirementAmount: number;

  @ManyToOne(() => Candy, { eager: true })
  evolutionRequirementCandy: Candy;
}
