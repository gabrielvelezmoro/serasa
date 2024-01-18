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

  // create
  async create({
    nome,
    idProducer,
    idProduct,
    cidade,
    cnpj,
    estado,
    produceble_area,
    total_area,
    vegetation_area,
  }: ICreateFarmDTO): Promise<HttpResponse> {
    const farm = this.repository.create({
      nome,
      cnpj,
      idProduct,
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

  // list
  async list(
    search: string,
    page: number,
    rowsPerPage: number,
    columnOrder: Array<"ASC" | "DESC">
  ): Promise<HttpResponse> {
    if (typeof columnOrder === "undefined" || columnOrder.length === 0) {
      const sortArray = new Array<"ASC" | "DESC">(4).fill("ASC");
      columnOrder = sortArray;
    }

    const offset = rowsPerPage * page;

    try {
      let farms = await this.repository
        .createQueryBuilder("nota")
        .select(["nota.id", "nota.idPessoa", "nota.titulo"])
        .where("CAST(titulo AS VARCHAR) ilike :search", {
          search: `%${search}%`,
        })
        .take(rowsPerPage)
        .skip(offset)
        .getMany();

      // below statements are to solve typeorm bug related to use of leftjoins, filters, .take and .skip together

      if (farms.length > rowsPerPage) {
        farms = farms.slice(offset, offset + rowsPerPage);
      }
      //

      return ok(farms);
    } catch (err) {
      return serverError(err);
    }
  }

  // get
  async get(id: string): Promise<HttpResponse> {
    try {
      const anotacao = await this.repository.findOne(id);

      if (typeof anotacao === "undefined") {
        return noContent();
      }

      return ok(anotacao);
    } catch (err) {
      return serverError(err);
    }
  }

  // update
  async update({
    id,
    nome,
    idProducer,
    idProduct,
    cidade,
    cnpj,
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
      cnpj,
      estado,
      idProducer,
      idProduct,
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

  // delete
  async delete(id: string): Promise<HttpResponse> {
    await this.repository.delete(id);

    return noContent();
  }
}

export { FarmRepository };
