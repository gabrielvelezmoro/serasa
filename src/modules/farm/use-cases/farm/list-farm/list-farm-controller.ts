import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListFarmUseCase } from "./list-farm-use-case";

class ListFarmController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listFarmUseCase = container.resolve(ListFarmUseCase);

    const farms = await listFarmUseCase.execute();

    return response.json(farms);
  }
}

export { ListFarmController };
