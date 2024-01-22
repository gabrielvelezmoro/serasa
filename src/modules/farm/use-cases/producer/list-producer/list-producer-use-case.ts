import { inject, injectable } from "tsyringe";
import { IProducerRepository } from "@modules/farm/repositories/i-producer-repository";
import { HttpResponse } from "@shared/helpers";

@injectable()
class ListProducerUseCase {
  constructor(
    @inject("ProducerRepository")
    private producerRepository: IProducerRepository
  ) {}

  async execute(): Promise<HttpResponse> {
    const producers = await this.producerRepository.list();

    return producers;
  }
}

export { ListProducerUseCase };
