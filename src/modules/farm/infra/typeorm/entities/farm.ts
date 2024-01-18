import { PrimaryColumn, Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import { Producer } from "./producer";
import { Product } from "./product";

@Entity("farm")
class Farm {
  @PrimaryColumn()
  id?: number;

  @ManyToOne(() => Producer, { nullable: false, eager: true })
  @JoinColumn({ name: "id_producer", referencedColumnName: "id" })
  idProducer: number;

  @ManyToOne(() => Product, { nullable: false, eager: true })
  @JoinColumn({ name: "id_product", referencedColumnName: "id" })
  idProduct: number;

  @Column({ name: "nome", nullable: false })
  nome: string;

  @Column({ name: "cnpj", nullable: false })
  cnpj: string;

  @Column({ name: "cidade", nullable: false })
  cidade: string;

  @Column({ name: "estado", nullable: false })
  estado: string;

  @Column({ name: "total_area", nullable: false })
  totalArea: number;

  @Column({ name: "produceble_area", nullable: false })
  producebleArea: number;

  @Column({ name: "vegetation_area", nullable: false })
  vegetationArea: number;
}

export { Farm };
