import { inject, injectable } from "tsyringe";
import { IProducerRepository } from "@modules/farm/repositories/i-producer-repository";
import { HttpResponse } from "@shared/helpers/http";
import { cpf as cpfValidator, cnpj as cnpjValidator } from "cpf-cnpj-validator";
import { AppError } from "@shared/errors/app-error";

interface IRequest {
  nome: string;
  cpfOuCNPJ: string;
}

@injectable()
class CreateProducerUseCase {
  constructor(
    @inject("ProducerRepository")
    private producerRepository: IProducerRepository
  ) {}

  async execute({ nome, cpfOuCNPJ }: IRequest): Promise<HttpResponse> {
    if (cpfValidator.isValid(cpfOuCNPJ) || cnpjValidator.isValid(cpfOuCNPJ))
      return this.producerRepository
        .create({
          nome,
          cpfOuCNPJ,
        })
        .then((newProducer) => {
          return newProducer;
        });
    else throw new AppError("cpf ou cnpj inválido", 400);
  }
}

export { CreateProducerUseCase };
