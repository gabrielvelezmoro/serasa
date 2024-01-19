import { inject, injectable } from "tsyringe";
import { IFarmRepository } from "@modules/farm/repositories/i-farm-repository";
import { HttpResponse } from "@shared/helpers";

@injectable()
class GetFarmUseCase {
  constructor(
    @inject("FarmRepository")
    private farmRepository: IFarmRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const farm = await this.farmRepository.get(id);

    return farm;
  }
}

export { GetFarmUseCase };
