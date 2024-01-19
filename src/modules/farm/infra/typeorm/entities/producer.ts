import { PrimaryColumn, Column, Entity } from "typeorm";

@Entity("producer")
class Producer {
  @PrimaryColumn()
  id?: number;

  @Column({ name: "nome", nullable: false })
  nome: string;

  @Column({ name: "cpf_cnpj", nullable: false })
  cpfOuCNPJ: string;
}

export { Producer };
