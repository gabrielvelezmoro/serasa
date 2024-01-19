import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateProducerUseCase } from "./create-producer-use-case";

class CreateProducerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { nome, cpfOuCNPJ } = request.body;

    const createProducerUseCase = container.resolve(CreateProducerUseCase);

    const result = await createProducerUseCase.execute({
      nome,
      cpfOuCNPJ,
    });

    return response.status(result.statusCode).send();
  }
}

export { CreateProducerController };
