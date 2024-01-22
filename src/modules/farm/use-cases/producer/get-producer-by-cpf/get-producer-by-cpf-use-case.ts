import { inject, injectable } from "tsyringe";
import { IProducerRepository } from "@modules/farm/repositories/i-producer-repository";
import { HttpResponse } from "@shared/helpers";

@injectable()
class GetProducerByCpfUseCase {
  constructor(
    @inject("ProducerRepository")
    private producertRepository: IProducerRepository
  ) {}

  async execute(cpfOuCNPJ: string): Promise<HttpResponse> {
    const pessoa = await this.producertRepository.getByCpfOrCnpj(cpfOuCNPJ);

    return pessoa;
  }
}

export { GetProducerByCpfUseCase };
