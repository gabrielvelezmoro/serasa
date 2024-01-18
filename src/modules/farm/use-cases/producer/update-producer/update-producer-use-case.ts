import { inject, injectable } from "tsyringe";
import { IProducerRepository } from "@modules/farm/repositories/i-producer-repository";
import { HttpResponse } from "@shared/helpers";

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
    const producer = await this.producerRepository.update({
      id,
      nome,
      cpf,
    });

    return producer;
  }
}

export { UpdateProducerUseCase };
