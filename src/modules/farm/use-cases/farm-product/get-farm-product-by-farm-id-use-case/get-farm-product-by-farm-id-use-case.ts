import { inject, injectable } from "tsyringe";
import { IFarmProductRepository } from "@modules/farm/repositories/i-farm-product-repository";
import { HttpResponse } from "@shared/helpers";

@injectable()
class GetProducerByIdUseCase {
  constructor(
    @inject("ProducerRepository")
    private farmProductRepository: IFarmProductRepository
  ) {}

  async execute(farmId: number): Promise<HttpResponse> {
    const producer = await this.farmProductRepository.getByFarmId(farmId);

    return producer;
  }
}

export { GetProducerByIdUseCase };
