import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBrandsAndCars1791963419485 implements MigrationInterface {
  name = 'CreateBrandsAndCars1791963419485';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "brands" (
        "id" SERIAL NOT NULL,
        "name" character varying(50) NOT NULL,
        "country" character varying(50),
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_96db6bbbaa6f23cad26871339b6" UNIQUE ("name"),
        CONSTRAINT "PK_b0c437120b624da1034a81fc561" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "cars" (
        "id" SERIAL NOT NULL,
        "model" character varying(100) NOT NULL,
        "price" numeric(10, 2) NOT NULL,
        "year" integer,
        "color" character varying,
        "brand_id" integer NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"),
        CONSTRAINT "FK_brand_cars" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "cars"`);
    await queryRunner.query(`DROP TABLE "brands"`);
  }
}