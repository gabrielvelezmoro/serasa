import { inject, injectable } from "tsyringe";
import { IProducerRepository } from "@modules/farm/repositories/i-producer-repository";
import { HttpResponse } from "@shared/helpers";

@injectable()
class DeleteProducerUseCase {
  constructor(
    @inject("ProducerRepository")
    private producerRepository: IProducerRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const producer = await this.producerRepository.delete(id);

    return producer;
  }
}

export { DeleteProducerUseCase };
