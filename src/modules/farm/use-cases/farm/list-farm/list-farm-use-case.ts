import { inject, injectable } from "tsyringe";
import { IFarmRepository } from "@modules/farm/repositories/i-farm-repository";
import { HttpResponse } from "@shared/helpers";

@injectable()
class ListFarmUseCase {
  constructor(
    @inject("FarmRepository")
    private farmRepository: IFarmRepository
  ) {}

  async execute(): Promise<HttpResponse> {
    const farms = await this.farmRepository.list();

    return farms;
  }
}

export { ListFarmUseCase };
