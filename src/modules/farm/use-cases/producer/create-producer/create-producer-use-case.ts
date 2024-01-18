import { inject, injectable } from "tsyringe";
import { IProducerRepository } from "@modules/farm/repositories/i-producer-repository";
import { HttpResponse } from "@shared/helpers/http";
import { cpf as validator } from "cpf-cnpj-validator";
import { AppError } from "@shared/errors/app-error";

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
    if (validator.isValid(cpf))
      return this.producerRepository
        .create({
          nome,
          cpf,
        })
        .then((newProducer) => {
          return newProducer;
        });
    else throw new AppError("cpf inválido", 400);
  }
}

export { CreateProducerUseCase };
