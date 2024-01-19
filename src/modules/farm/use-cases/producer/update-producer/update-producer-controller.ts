import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateProducerUseCase } from "./update-producer-use-case";

class UpdateProducerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { nome, cpfOuCNPJ } = request.body;
    const { id } = request.params;

    const updateProducerUseCase = container.resolve(UpdateProducerUseCase);

    const result = await updateProducerUseCase
      .execute({
        id: Number(id),
        nome,
        cpfOuCNPJ,
      })
      .then((pessoaResult) => {
        return pessoaResult;
      })
      .catch((error) => {
        return error;
      });

    return response.status(result.statusCode).json(result);
  }
}

export { UpdateProducerController };
