import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteProducerUseCase } from "./delete-producer-use-case";

class DeleteProducerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;
    const deleteProducerUseCase = container.resolve(DeleteProducerUseCase);
    await deleteProducerUseCase.execute(id);

    return response.send();
  }
}

export { DeleteProducerController };
