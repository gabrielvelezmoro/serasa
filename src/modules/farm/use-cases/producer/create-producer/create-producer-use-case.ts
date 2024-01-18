import { inject, injectable } from "tsyringe";
import { Producer } from "@modules/farm/infra/typeorm/entities/producer";
import { IProducerRepository } from "@modules/farm/repositories/i-producer-repository";
import { AppError } from "@shared/errors/app-error";
import { HttpResponse } from "@shared/helpers/http";

interface IRequest {
  nome: string;
  cpf: string;
}

@injectable()
class CreateProducerUseCase {
  constructor(
    @inject("ProducerRepository")
    private producerRepository: IProducerRepository
  ) {}

  async execute({ nome, cpf }: IRequest): Promise<HttpResponse> {
    return this.producerRepository
      .create({
        nome,
        cpf,
      })
      .then((newProducer) => {
        return newProducer;
      });
  }
}

export { CreateProducerUseCase };
