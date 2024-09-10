import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PokemonType } from '../../pokemon-type/entities/pokemonType.entity';
import { AttackType } from '../enums/attack-type.enum';

@Entity()
export class Attack {
  @PrimaryGeneratedColumn()
  attackId: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: AttackType,
  })
  attackType: AttackType;

  @Column()
  damage: number;

  @ManyToOne(() => PokemonType)
  type: PokemonType;
}
