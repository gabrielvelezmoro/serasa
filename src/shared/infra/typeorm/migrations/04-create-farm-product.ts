import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFarmProduct1672799344025 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "farm_product",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "id_farm",
            type: "integer",
            isNullable: false,
          },
          {
            name: "id_product",
            type: "integer",
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            name: "FKFarmProductFarm",
            referencedTableName: "farm",
            referencedColumnNames: ["id"],
            columnNames: ["id_farm"],
            onDelete: "CASCADE",
            onUpdate: "SET NULL",
          },
          {
            name: "FKFarmProductProduct",
            referencedTableName: "product",
            referencedColumnNames: ["id"],
            columnNames: ["id_product"],
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
