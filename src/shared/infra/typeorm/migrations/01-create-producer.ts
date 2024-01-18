import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProducer1672799344002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "producer",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "nome",
            type: "varchar",
            isNullable: false,
            length: "255",
          },
          {
            name: "cpf",
            type: "varchar",
            isUnique: true,
            isNullable: false,
            length: "255",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("producer");
  }
}
