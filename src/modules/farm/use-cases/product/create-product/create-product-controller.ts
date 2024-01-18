import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateProductUseCase } from "./create-product-use-case";

class CreateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { nome } = request.body;

    const createProductUseCase = container.resolve(CreateProductUseCase);

    const result = await createProductUseCase.execute({
      nome,
    });

    return response.status(result.statusCode).send();
  }
}

export { CreateProductController };
