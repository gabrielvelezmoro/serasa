import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetFarmDashboardUseCase } from "./get-farm-dashboard-use-case";

class GetFarmDashboardController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.idProducer;
    const getFarmDashboardUseCase = container.resolve(GetFarmDashboardUseCase);
    const farm = await getFarmDashboardUseCase.execute(id);

    return response.status(farm.statusCode).json(farm.data);
  }
}

export { GetFarmDashboardController };
