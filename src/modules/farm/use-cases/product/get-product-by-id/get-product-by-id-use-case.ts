import { inject, injectable } from "tsyringe";
import { IProducerRepository } from "@modules/farm/repositories/i-producer-repository";
import { HttpResponse } from "@shared/helpers";

@injectable()
class GetProducerByIdUseCase {
  constructor(
    @inject("ProducerRepository")
    private producertRepository: IProducerRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const pessoa = await this.producertRepository.get(id);

    return pessoa;
  }
}

export { GetProducerByIdUseCase };
