import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateProducerUseCase } from "./create-producer-use-case";
import { AppError } from "@shared/errors/app-error";

class CreateProducerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { nome, cpf } = request.body;

    const createProducerUseCase = container.resolve(CreateProducerUseCase);

    const result = await createProducerUseCase.execute({
      nome,
      cpf,
    });

    return response.status(result.statusCode).send();
  }
}

export { CreateProducerController };
