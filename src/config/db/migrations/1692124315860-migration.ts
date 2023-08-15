import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1692124315860 implements MigrationInterface {
  name = 'Migration1692124315860';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "test"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "companies" ADD "test" character varying NOT NULL`);
  }
}
