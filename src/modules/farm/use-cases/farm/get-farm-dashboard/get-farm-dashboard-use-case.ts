import { inject, injectable } from "tsyringe";
import { IFarmRepository } from "@modules/farm/repositories/i-farm-repository";
import { HttpResponse } from "@shared/helpers";

@injectable()
class GetFarmDashboardUseCase {
  constructor(
    @inject("FarmRepository")
    private farmRepository: IFarmRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    let farmDashboard = await this.farmRepository.getDashboard(id);

    let areaTotal = 0;
    let areaTotalUtilizada = 0;

    for (let index = 0; index < farmDashboard.data.length; index++) {
      areaTotal += farmDashboard.data[index].totalArea;
      areaTotalUtilizada += farmDashboard.data[index].producebleArea;
    }

    let usoDeSoloTotal = areaTotalUtilizada / areaTotal;

    const result = {
      quantidadeDeFazendas: farmDashboard.data.length,
      areaTotal,
      totalPorEstado: 0,
      totalPorCultura: 0,
      usoDeSoloTotal,
    };

    farmDashboard.data = result;
    return farmDashboard;
  }
}

export { GetFarmDashboardUseCase };
