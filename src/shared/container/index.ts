import { container } from "tsyringe";

import "@shared/container/providers";

import { IProducerRepository } from "@modules/farm/repositories/i-producer-repository";
import { ProducerRepository } from "@modules/farm/infra/typeorm/repositories/producer-repository";
import { IFarmRepository } from "@modules/farm/repositories/i-farm-repository";
import { FarmRepository } from "@modules/farm/infra/typeorm/repositories/farm-repository";
import { IProductRepository } from "@modules/farm/repositories/i-product-repository";
import { ProductRepository } from "@modules/farm/infra/typeorm/repositories/product-repository";

container.registerSingleton<IProducerRepository>(
  "ProducerRepository",
  ProducerRepository
);
container.registerSingleton<IFarmRepository>("FarmRepository", FarmRepository);
container.registerSingleton<IProductRepository>(
  "ProductRepository",
  ProductRepository
);
