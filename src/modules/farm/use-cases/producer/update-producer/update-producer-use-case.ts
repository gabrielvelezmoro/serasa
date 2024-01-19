import { inject, injectable } from "tsyringe";
import { IProducerRepository } from "@modules/farm/repositories/i-producer-repository";
import { HttpResponse } from "@shared/helpers";
import { cpf as cpfValidator, cnpj as cnpjValidator } from "cpf-cnpj-validator";
import { AppError } from "@shared/errors/app-error";

interface IRequest {
  id: number;
  nome: string;
  cpfOuCNPJ: string;
}

@injectable()
class UpdateProducerUseCase {
  constructor(
    @inject("ProducerRepository")
    private producerRepository: IProducerRepository
  ) {}

  async execute({ nome, cpfOuCNPJ, id }: IRequest): Promise<HttpResponse> {
    if (cpfValidator.isValid(cpfOuCNPJ) || cnpjValidator.isValid(cpfOuCNPJ))
      return this.producerRepository.update({
        id,
        nome,
        cpfOuCNPJ,
      });
    else throw new AppError("cpf inválido", 400);
  }
}

export { UpdateProducerUseCase };
