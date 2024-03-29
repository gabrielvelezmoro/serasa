import { getRepository, Repository } from "typeorm";
import { ICreateProducerDTO } from "@modules/farm/dtos/producer-dto/i-create-producer-dto";
import { IUpdateProducerDTO } from "@modules/farm/dtos/producer-dto/i-update-producer-dto";
import { IProducerRepository } from "@modules/farm/repositories/i-producer-repository";
import { Producer } from "@modules/farm/infra/typeorm/entities/producer";
import {
  noContent,
  serverError,
  ok,
  notFound,
  HttpResponse,
  created,
} from "@shared/helpers";

class ProducerRepository implements IProducerRepository {
  private repository: Repository<Producer>;

  constructor() {
    this.repository = getRepository(Producer);
  }

  async create({ nome, cpfOuCNPJ }: ICreateProducerDTO): Promise<HttpResponse> {
    const producer = await this.repository.create({
      nome,
      cpfOuCNPJ,
    });

    const result = await this.repository
      .save(producer)
      .then((newProducer) => {
        return created(newProducer);
      })
      .catch((error) => {
        return serverError(error.message);
      });

    return result;
  }

  async list(): Promise<HttpResponse> {
    try {
      let producers = await this.repository
        .createQueryBuilder("producer")
        .select()
        .getMany();
      return ok(producers);
    } catch (err) {
      return serverError(err);
    }
  }

  async get(id: string): Promise<HttpResponse> {
    try {
      const producer = await this.repository.findOne(id);

      if (typeof producer === "undefined") {
        return noContent();
      }

      return ok(producer);
    } catch (err) {
      return serverError(err);
    }
  }

  async getByCpfOrCnpj(cpfOuCNPJ: string): Promise<HttpResponse> {
    try {
      const person = await this.repository
        .createQueryBuilder("producer")
        .select()
        .where({ cpfOuCNPJ })
        .getOneOrFail();

      if (typeof person === "undefined") {
        return noContent();
      }

      return ok(person);
    } catch (err) {
      return serverError(err);
    }
  }

  async update(data: IUpdateProducerDTO): Promise<HttpResponse> {
    const { id } = data;
    const producer = await this.repository.findOne(id);

    if (!producer) {
      return notFound();
    }

    try {
      await this.repository.update(producer, data);

      return noContent();
    } catch (err) {
      return serverError(err);
    }
  }

  async delete(id: string): Promise<HttpResponse> {
    await this.repository.delete(id);

    return noContent();
  }
}

export { ProducerRepository };
