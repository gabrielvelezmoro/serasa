import { getRepository, Repository } from "typeorm";
import { IFarmProductDTO } from "@modules/farm/dtos/farm-product-dto/i-create-farm-product-dto";
import { IFarmProductRepository } from "@modules/farm/repositories/i-farm-product-repository";
import { FarmProduct } from "@modules/farm/infra/typeorm/entities/farm-product";
import { noContent, serverError, ok, HttpResponse } from "@shared/helpers";

class FarmProductRepository implements IFarmProductRepository {
  private repository: Repository<FarmProduct>;

  constructor() {
    this.repository = getRepository(FarmProduct);
  }

  async create({ idFarm, idProduct }: IFarmProductDTO): Promise<HttpResponse> {
    const farm = this.repository.create({ idFarm, idProduct });

    const result = await this.repository
      .save(farm)
      .then((farmResult) => {
        console.log(farmResult);
        return ok(farmResult);
      })
      .catch((error) => {
        return serverError(error.message);
      });

    return result;
  }

  async list(): Promise<HttpResponse> {
    try {
      let farms = await this.repository
        .createQueryBuilder("farm")
        .select()
        .getMany();

      return ok(farms);
    } catch (err) {
      return serverError(err);
    }
  }

  async get(id: string): Promise<HttpResponse> {
    try {
      const farm = await this.repository.findOne(id);

      if (typeof farm === "undefined") {
        return noContent();
      }

      return ok(farm);
    } catch (err) {
      return serverError(err);
    }
  }

  async getDashboard(id: string): Promise<HttpResponse> {
    try {
      const dashboard = await this.repository
        .createQueryBuilder("farm")
        .where("id_producer = :id", { id })
        .getMany();

      console.log(dashboard);

      if (typeof dashboard === "undefined") {
        return noContent();
      }

      return ok(dashboard);
    } catch (err) {
      return serverError(err);
    }
  }

  async delete(id: string): Promise<HttpResponse> {
    await this.repository.delete(id);

    return noContent();
  }
}

export { FarmProductRepository };
