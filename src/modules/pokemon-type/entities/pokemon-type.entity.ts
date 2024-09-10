import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PokemonType {
  @PrimaryGeneratedColumn()
  pokemonTypeId: number;

  @Column()
  name: string;
}
