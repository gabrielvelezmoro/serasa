import { inject, injectable } from "tsyringe";
import { IProducerRepository } from "@modules/farm/repositories/i-producer-repository";
import { HttpResponse } from "@shared/helpers";
import { cpf as validator } from "cpf-cnpj-validator";
import { AppError } from "@shared/errors/app-error";

interface IRequest {
  id: number;
  nome: string;
  cpf: string;
}

@injectable()
class UpdateProducerUseCase {
  constructor(
    @inject("ProducerRepository")
    private producerRepository: IProducerRepository
  ) {}

  async execute({ nome, cpf, id }: IRequest): Promise<HttpResponse> {
    if (validator.isValid(cpf))
      return this.producerRepository.update({
        id,
        nome,
        cpf,
      });
    else throw new AppError("cpf inválido", 400);
  }
}

export { UpdateProducerUseCase };
