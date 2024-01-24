import { container } from "tsyringe";

import { IProducerRepository } from "@modules/farm/repositories/i-producer-repository";
import { ProducerRepository } from "@modules/farm/infra/typeorm/repositories/producer-repository";
import { IFarmRepository } from "@modules/farm/repositories/i-farm-repository";
import { FarmRepository } from "@modules/farm/infra/typeorm/repositories/farm-repository";
import { IProductRepository } from "@modules/farm/repositories/i-product-repository";
import { FarmProductRepository } from "@modules/farm/infra/typeorm/repositories/farm-product-repository";
import { ProductRepository } from "@modules/farm/infra/typeorm/repositories/product-repository";
import { IFarmProductRepository } from "@modules/farm/repositories/i-farm-product-repository";

container.registerSingleton<IProducerRepository>(
  "ProducerRepository",
  ProducerRepository
);
container.registerSingleton<IFarmRepository>("FarmRepository", FarmRepository);
container.registerSingleton<IProductRepository>(
  "ProductRepository",
  ProductRepository
);
container.registerSingleton<IFarmProductRepository>(
  "FarmProductRepository",
  FarmProductRepository
);
