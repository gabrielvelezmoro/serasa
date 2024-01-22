import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListProducerUseCase } from "./list-producer-use-case";

class ListProducerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listPessoaUseCase = container.resolve(ListProducerUseCase);

    const producers = await listPessoaUseCase.execute();

    return response.status(producers.statusCode).json(producers.data);
  }
}

export { ListProducerController };
