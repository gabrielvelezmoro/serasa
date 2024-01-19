import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetFarmUseCase } from "./get-farm-use-case";

class GetFarmController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;
    const getFarmUseCase = container.resolve(GetFarmUseCase);
    const farm = await getFarmUseCase.execute(id);

    return response.status(farm.statusCode).json(farm.data);
  }
}

export { GetFarmController };
