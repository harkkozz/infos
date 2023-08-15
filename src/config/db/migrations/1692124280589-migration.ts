import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1692124280589 implements MigrationInterface {
  name = 'Migration1692124280589';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "companies" ADD "test" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "companies" ADD "userId" uuid NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "companies" ADD CONSTRAINT "FK_6d64e8c7527a9e4af83cc66cbf7" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "FK_6d64e8c7527a9e4af83cc66cbf7"`);
    await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "companies" ADD "userId" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "test"`);
  }
}
