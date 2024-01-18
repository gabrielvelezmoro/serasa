import { PrimaryColumn, Entity, JoinColumn, ManyToOne } from "typeorm";

import { Farm } from "./farm";
import { Product } from "./product";

@Entity("farm_product")
class FarmProduct {
  @PrimaryColumn()
  id?: number;

  @ManyToOne(() => Farm, { nullable: false, eager: true })
  @JoinColumn({ name: "id_farm", referencedColumnName: "id" })
  idFarm: number;

  @ManyToOne(() => Product, { nullable: false, eager: true })
  @JoinColumn({ name: "id_product", referencedColumnName: "id" })
  idProduct: number;
}

export { FarmProduct };
