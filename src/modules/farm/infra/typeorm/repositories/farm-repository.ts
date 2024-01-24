import { getRepository, Repository } from "typeorm";
import { ICreateFarmDTO } from "@modules/farm/dtos/farm-dto/i-create-farm-dto";
import { IFarmRepository } from "@modules/farm/repositories/i-farm-repository";
import { Farm } from "@modules/farm/infra/typeorm/entities/farm";
import { noContent, serverError, ok, HttpResponse } from "@shared/helpers";

class FarmRepository implements IFarmRepository {
  private repository: Repository<Farm>;

  constructor() {
    this.repository = getRepository(Farm);
  }

  async create({
    nome,
    idProducer,
    cidade,
    estado,
    produceble_area,
    total_area,
    vegetation_area,
  }: ICreateFarmDTO): Promise<HttpResponse> {
    const farm = this.repository.create({
      nome,
      idProducer,
      producebleArea: produceble_area,
      vegetationArea: vegetation_area,
      totalArea: total_area,
      cidade,
      estado,
    });

    const result = await this.repository
      .save(farm)
      .then((farmResult) => {
        return ok(farmResult);
      })
      .catch((error) => {
        return serverError(error.message);
      });
    console.log(result);

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

export { FarmRepository };
