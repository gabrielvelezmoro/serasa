import {
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
} from "typeorm";

@Entity("product")
class Product {
  @PrimaryColumn()
  id?: number;

  @Column({ name: "nome", nullable: false })
  nome: string;
}

export { Product };
