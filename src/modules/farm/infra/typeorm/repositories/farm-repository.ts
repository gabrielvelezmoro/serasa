import { getRepository, Repository } from "typeorm";
import { ICreateFarmDTO } from "@modules/farm/dtos/farm-dto/i-create-farm-dto";
import { IUpdateFarmDTO } from "@modules/farm/dtos/farm-dto/i-update-farm-dto";
import { IFarmRepository } from "@modules/farm/repositories/i-farm-repository";
import { Farm } from "@modules/farm/infra/typeorm/entities/farm";
import {
  noContent,
  serverError,
  ok,
  notFound,
  HttpResponse,
} from "@shared/helpers";

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
        .select(["nota.id", "nota.idPessoa", "nota.titulo"])

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

  async update({
    id,
    nome,
    idProducer,
    cidade,
    estado,
    produceble_area,
    total_area,
    vegetation_area,
  }: IUpdateFarmDTO): Promise<HttpResponse> {
    const anotacao = await this.repository.findOne(id);

    if (!anotacao) {
      return notFound();
    }

    const newAnotacao = this.repository.create({
      cidade,
      estado,
      idProducer,
      nome,
      producebleArea: produceble_area,
      totalArea: total_area,
      vegetationArea: vegetation_area,
    });

    try {
      await this.repository.update(anotacao, newAnotacao);

      return ok(newAnotacao);
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
