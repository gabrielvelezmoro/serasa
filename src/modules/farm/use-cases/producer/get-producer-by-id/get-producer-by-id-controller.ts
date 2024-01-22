import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetProducerByIdUseCase } from "./get-producer-by-id-use-case";

class GetProducerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;
    const getProducerByIdUseCase = container.resolve(GetProducerByIdUseCase);
    const producer = await getProducerByIdUseCase.execute(id);

    return response.status(producer.statusCode).json(producer.data);
  }
}

export { GetProducerController };
