import { getRepository, Repository } from "typeorm";
import { ICreateProductDTO } from "@modules/farm/dtos/product-dto/i-create-producer-dto";
import { Product } from "@modules/farm/infra/typeorm/entities/product";
import {
  noContent,
  serverError,
  ok,
  HttpResponse,
  created,
} from "@shared/helpers";
import { IProductRepository } from "@modules/farm/repositories/i-product-repository";

class ProductRepository implements IProductRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = getRepository(Product);
  }

  async create({ nome }: ICreateProductDTO): Promise<HttpResponse> {
    const product = this.repository.create({
      nome,
    });

    const result = await this.repository
      .save(product)
      .then((newProduct) => {
        return created(newProduct);
      })
      .catch((error) => {
        return serverError(error.message);
      });

    return result;
  }

  async list(): Promise<HttpResponse> {
    try {
      let products = await this.repository
        .createQueryBuilder("product")
        .select()
        .getMany();
      return ok(products);
    } catch (err) {
      return serverError(err);
    }
  }

  async get(id: string): Promise<HttpResponse> {
    try {
      const products = await this.repository.findOne(id);

      if (typeof products === "undefined") {
        return noContent();
      }

      return ok(products);
    } catch (err) {
      return serverError(err);
    }
  }
}

export { ProductRepository };
