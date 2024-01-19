import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFarm1672799344025 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "farm",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "id_producer",
            type: "integer",
            isNullable: false,
          },
          {
            name: "nome",
            type: "varchar",
            isNullable: false,
            length: "255",
          },
          {
            name: "cidade",
            type: "varchar",
            isNullable: false,
            length: "255",
          },
          {
            name: "estado",
            type: "varchar",
            isNullable: false,
            length: "255",
          },
          {
            name: "total_area",
            type: "integer",
            isNullable: false,
          },
          {
            name: "produceble_area",
            type: "integer",
            isNullable: false,
          },
          {
            name: "vegetation_area",
            type: "integer",
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            name: "FKFarmProducer",
            referencedTableName: "producer",
            referencedColumnNames: ["id"],
            columnNames: ["id_producer"],
            onDelete: "CASCADE",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("farm");
  }
}
