import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1727951833904 implements MigrationInterface {
  name = 'Init1727951833904';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "classification" ("classificationId" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_31b83e60d83488e9cee01186eb7" PRIMARY KEY ("classificationId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "pokemon_type" ("pokemonTypeId" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_955b0c2e5445ece5090bdae7fa6" PRIMARY KEY ("pokemonTypeId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "class" ("classId" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_72719a39cdc7740c53d96c716bd" PRIMARY KEY ("classId"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."attack_attacktype_enum" AS ENUM('fast', 'special')`,
    );
    await queryRunner.query(
      `CREATE TABLE "attack" ("attackId" SERIAL NOT NULL, "name" character varying NOT NULL, "attackType" "public"."attack_attacktype_enum" NOT NULL, "damage" integer NOT NULL, "typePokemonTypeId" integer, CONSTRAINT "PK_5c7f138453b7addb2c3006bbc8f" PRIMARY KEY ("attackId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "pokemon" ("pokemonId" integer NOT NULL, "name" character varying NOT NULL, "minWeight" double precision NOT NULL, "maxWeight" double precision NOT NULL, "minHeight" double precision NOT NULL, "maxHeight" double precision NOT NULL, "fleeRate" double precision NOT NULL, "maxCP" integer NOT NULL, "maxHP" integer NOT NULL, "evolutionRequirementAmount" integer, "evolutionRequirementCandy" character varying, "classificationClassificationId" integer NOT NULL, "classClassId" integer, CONSTRAINT "UQ_1cb8fc72a68e5a601312c642c82" UNIQUE ("name"), CONSTRAINT "PK_73bc51466acc7b1da400a5864b2" PRIMARY KEY ("pokemonId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("userId" SERIAL NOT NULL, "email" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "pokemon_types" ("pokemonPokemonId" integer NOT NULL, "pokemonTypePokemonTypeId" integer NOT NULL, CONSTRAINT "PK_6bcae5e37b45aaddf19ec076b12" PRIMARY KEY ("pokemonPokemonId", "pokemonTypePokemonTypeId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b15ca42983d3f9ecca45e1b042" ON "pokemon_types" ("pokemonPokemonId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c0e93a3ac2a26c2dea00665a93" ON "pokemon_types" ("pokemonTypePokemonTypeId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "pokemon_resistances" ("pokemonPokemonId" integer NOT NULL, "pokemonTypePokemonTypeId" integer NOT NULL, CONSTRAINT "PK_f85078ea765b9767ed1c8971f75" PRIMARY KEY ("pokemonPokemonId", "pokemonTypePokemonTypeId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_60dadeaf23e2206f87f648c284" ON "pokemon_resistances" ("pokemonPokemonId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4c0e6a54665b73a31aab7bc1a9" ON "pokemon_resistances" ("pokemonTypePokemonTypeId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "pokemon_weaknesses" ("pokemonPokemonId" integer NOT NULL, "pokemonTypePokemonTypeId" integer NOT NULL, CONSTRAINT "PK_5ed713b81b9e68c0b7e9f900c61" PRIMARY KEY ("pokemonPokemonId", "pokemonTypePokemonTypeId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6a81443be3c3b3b86e8da5e32e" ON "pokemon_weaknesses" ("pokemonPokemonId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c402b49aecfafdfcabad8989ef" ON "pokemon_weaknesses" ("pokemonTypePokemonTypeId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "pokemon_attacks" ("pokemonPokemonId" integer NOT NULL, "attackAttackId" integer NOT NULL, CONSTRAINT "PK_e758382dc2bde2d002d0acb4586" PRIMARY KEY ("pokemonPokemonId", "attackAttackId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c2f2b72a469ed9066953db0c2e" ON "pokemon_attacks" ("pokemonPokemonId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2673e73435216cda2dcae1a386" ON "pokemon_attacks" ("attackAttackId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "pokemon_previous_evolutions" ("pokemonPokemonId_1" integer NOT NULL, "pokemonPokemonId_2" integer NOT NULL, CONSTRAINT "PK_d5326f1363e3bfccdbe348d5560" PRIMARY KEY ("pokemonPokemonId_1", "pokemonPokemonId_2"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_857015bf1b74775c052bc735b8" ON "pokemon_previous_evolutions" ("pokemonPokemonId_1") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_14251278893b85e43ddb8b6697" ON "pokemon_previous_evolutions" ("pokemonPokemonId_2") `,
    );
    await queryRunner.query(
      `CREATE TABLE "pokemon_next_evolutions" ("pokemonPokemonId_1" integer NOT NULL, "pokemonPokemonId_2" integer NOT NULL, CONSTRAINT "PK_952298c21587fbeb92956519b0d" PRIMARY KEY ("pokemonPokemonId_1", "pokemonPokemonId_2"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0a34f6f7036a681545a19055f3" ON "pokemon_next_evolutions" ("pokemonPokemonId_1") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c8397b1dec218b69d107dd4e9f" ON "pokemon_next_evolutions" ("pokemonPokemonId_2") `,
    );
    await queryRunner.query(
      `CREATE TABLE "user_favorite_pokemons" ("userUserId" integer NOT NULL, "pokemonPokemonId" integer NOT NULL, CONSTRAINT "PK_c1b0d30cf61848e64c169d79013" PRIMARY KEY ("userUserId", "pokemonPokemonId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_62f81556727a91cae6bc32ca12" ON "user_favorite_pokemons" ("userUserId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d6de7f0638f8de5e328dd88329" ON "user_favorite_pokemons" ("pokemonPokemonId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "attack" ADD CONSTRAINT "FK_53a5562d7c700673fb39658d9ed" FOREIGN KEY ("typePokemonTypeId") REFERENCES "pokemon_type"("pokemonTypeId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "pokemon" ADD CONSTRAINT "FK_74e633bba733cec35fd7341a788" FOREIGN KEY ("classificationClassificationId") REFERENCES "classification"("classificationId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "pokemon" ADD CONSTRAINT "FK_17ada6735060fa9ea29fcfb3344" FOREIGN KEY ("classClassId") REFERENCES "class"("classId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "pokemon_types" ADD CONSTRAINT "FK_b15ca42983d3f9ecca45e1b0423" FOREIGN KEY ("pokemonPokemonId") REFERENCES "pokemon"("pokemonId") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "pokemon_types" ADD CONSTRAINT "FK_c0e93a3ac2a26c2dea00665a93a" FOREIGN KEY ("pokemonTypePokemonTypeId") REFERENCES "pokemon_type"("pokemonTypeId") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "pokemon_resistances" ADD CONSTRAINT "FK_60dadeaf23e2206f87f648c2848" FOREIGN KEY ("pokemonPokemonId") REFERENCES "pokemon"("pokemonId") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "pokemon_resistances" ADD CONSTRAINT "FK_4c0e6a54665b73a31aab7bc1a9d" FOREIGN KEY ("pokemonTypePokemonTypeId") REFERENCES "pokemon_type"("pokemonTypeId") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "pokemon_weaknesses" ADD CONSTRAINT "FK_6a81443be3c3b3b86e8da5e32e1" FOREIGN KEY ("pokemonPokemonId") REFERENCES "pokemon"("pokemonId") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "pokemon_weaknesses" ADD CONSTRAINT "FK_c402b49aecfafdfcabad8989ef1" FOREIGN KEY ("pokemonTypePokemonTypeId") REFERENCES "pokemon_type"("pokemonTypeId") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "pokemon_attacks" ADD CONSTRAINT "FK_c2f2b72a469ed9066953db0c2e8" FOREIGN KEY ("pokemonPokemonId") REFERENCES "pokemon"("pokemonId") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "pokemon_attacks" ADD CONSTRAINT "FK_2673e73435216cda2dcae1a386c" FOREIGN KEY ("attackAttackId") REFERENCES "attack"("attackId") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "pokemon_previous_evolutions" ADD CONSTRAINT "FK_857015bf1b74775c052bc735b82" FOREIGN KEY ("pokemonPokemonId_1") REFERENCES "pokemon"("pokemonId") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "pokemon_previous_evolutions" ADD CONSTRAINT "FK_14251278893b85e43ddb8b6697e" FOREIGN KEY ("pokemonPokemonId_2") REFERENCES "pokemon"("pokemonId") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "pokemon_next_evolutions" ADD CONSTRAINT "FK_0a34f6f7036a681545a19055f3e" FOREIGN KEY ("pokemonPokemonId_1") REFERENCES "pokemon"("pokemonId") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "pokemon_next_evolutions" ADD CONSTRAINT "FK_c8397b1dec218b69d107dd4e9fc" FOREIGN KEY ("pokemonPokemonId_2") REFERENCES "pokemon"("pokemonId") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_favorite_pokemons" ADD CONSTRAINT "FK_62f81556727a91cae6bc32ca12c" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_favorite_pokemons" ADD CONSTRAINT "FK_d6de7f0638f8de5e328dd883295" FOREIGN KEY ("pokemonPokemonId") REFERENCES "pokemon"("pokemonId") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_favorite_pokemons" DROP CONSTRAINT "FK_d6de7f0638f8de5e328dd883295"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_favorite_pokemons" DROP CONSTRAINT "FK_62f81556727a91cae6bc32ca12c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pokemon_next_evolutions" DROP CONSTRAINT "FK_c8397b1dec218b69d107dd4e9fc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pokemon_next_evolutions" DROP CONSTRAINT "FK_0a34f6f7036a681545a19055f3e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pokemon_previous_evolutions" DROP CONSTRAINT "FK_14251278893b85e43ddb8b6697e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pokemon_previous_evolutions" DROP CONSTRAINT "FK_857015bf1b74775c052bc735b82"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pokemon_attacks" DROP CONSTRAINT "FK_2673e73435216cda2dcae1a386c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pokemon_attacks" DROP CONSTRAINT "FK_c2f2b72a469ed9066953db0c2e8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pokemon_weaknesses" DROP CONSTRAINT "FK_c402b49aecfafdfcabad8989ef1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pokemon_weaknesses" DROP CONSTRAINT "FK_6a81443be3c3b3b86e8da5e32e1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pokemon_resistances" DROP CONSTRAINT "FK_4c0e6a54665b73a31aab7bc1a9d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pokemon_resistances" DROP CONSTRAINT "FK_60dadeaf23e2206f87f648c2848"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pokemon_types" DROP CONSTRAINT "FK_c0e93a3ac2a26c2dea00665a93a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pokemon_types" DROP CONSTRAINT "FK_b15ca42983d3f9ecca45e1b0423"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pokemon" DROP CONSTRAINT "FK_17ada6735060fa9ea29fcfb3344"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pokemon" DROP CONSTRAINT "FK_74e633bba733cec35fd7341a788"`,
    );
    await queryRunner.query(
      `ALTER TABLE "attack" DROP CONSTRAINT "FK_53a5562d7c700673fb39658d9ed"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d6de7f0638f8de5e328dd88329"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_62f81556727a91cae6bc32ca12"`,
    );
    await queryRunner.query(`DROP TABLE "user_favorite_pokemons"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c8397b1dec218b69d107dd4e9f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0a34f6f7036a681545a19055f3"`,
    );
    await queryRunner.query(`DROP TABLE "pokemon_next_evolutions"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_14251278893b85e43ddb8b6697"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_857015bf1b74775c052bc735b8"`,
    );
    await queryRunner.query(`DROP TABLE "pokemon_previous_evolutions"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2673e73435216cda2dcae1a386"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c2f2b72a469ed9066953db0c2e"`,
    );
    await queryRunner.query(`DROP TABLE "pokemon_attacks"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c402b49aecfafdfcabad8989ef"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6a81443be3c3b3b86e8da5e32e"`,
    );
    await queryRunner.query(`DROP TABLE "pokemon_weaknesses"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4c0e6a54665b73a31aab7bc1a9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_60dadeaf23e2206f87f648c284"`,
    );
    await queryRunner.query(`DROP TABLE "pokemon_resistances"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c0e93a3ac2a26c2dea00665a93"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b15ca42983d3f9ecca45e1b042"`,
    );
    await queryRunner.query(`DROP TABLE "pokemon_types"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "pokemon"`);
    await queryRunner.query(`DROP TABLE "attack"`);
    await queryRunner.query(`DROP TYPE "public"."attack_attacktype_enum"`);
    await queryRunner.query(`DROP TABLE "class"`);
    await queryRunner.query(`DROP TABLE "pokemon_type"`);
    await queryRunner.query(`DROP TABLE "classification"`);
  }
}
