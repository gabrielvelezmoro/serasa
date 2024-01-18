import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListProducerUseCase } from "./list-product-use-case";

class ListProducerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listProductUseCase = container.resolve(ListProducerUseCase);

    const products = await listProductUseCase.execute();

    return response.json(products);
  }
}

export { ListProducerController };
