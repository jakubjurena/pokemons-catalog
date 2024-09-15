import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Classification } from './classification.entity';
import { PokemonType } from '../../pokemon-type/entities/pokemon-type.entity';
import { Class } from './class.entity';
import { Attack } from './attack.entity';

@Entity()
export class Pokemon {
  @PrimaryColumn()
  pokemonId: number;

  @Column({ unique: true })
  name: string;

  @ManyToOne(
    () => Classification,
    (classification) => classification.pokemons,
    { nullable: false },
  )
  classification: Classification;

  @ManyToOne(() => Class, (classType) => classType.pokemons, {
    nullable: true,
  })
  class: Class | null;

  @ManyToMany(() => PokemonType, { nullable: false })
  @JoinTable({ name: 'pokemon_types' })
  types: PokemonType[];

  @ManyToMany(() => PokemonType, { nullable: false })
  @JoinTable({ name: 'pokemon_resistances' })
  resistant: PokemonType[];

  @ManyToMany(() => PokemonType, { nullable: false })
  @JoinTable({ name: 'pokemon_weaknesses' })
  weaknesses: PokemonType[];

  @ManyToMany(() => Attack, { nullable: false })
  @JoinTable({ name: 'pokemon_attacks' })
  attacks: Attack[];

  @Column('float')
  minWeight: number;

  @Column('float')
  maxWeight: number;

  @Column('float')
  minHeight: number;

  @Column('float')
  maxHeight: number;

  @Column('float')
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

  @Column({ nullable: true })
  evolutionRequirementAmount: number | null;

  @Column({ nullable: true })
  evolutionRequirementCandy: string | null;
}
