import {
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
} from "typeorm";

@Entity("producer")
class Producer {
  @PrimaryColumn()
  id?: number;

  @Column({ name: "nome", nullable: false })
  nome: string;

  @Column({ name: "cpf", nullable: false })
  cpf: string;
}

export { Producer };
