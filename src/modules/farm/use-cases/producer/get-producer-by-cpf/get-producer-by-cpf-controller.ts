import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetProducerByCpfUseCase } from "./get-producer-by-cpf-use-case";

class GetProducerByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const cpfOuCNPJ = request.params.cpfOuCNPJ;
    const getProducerByCpfUseCase = container.resolve(GetProducerByCpfUseCase);
    const producer = await getProducerByCpfUseCase.execute(cpfOuCNPJ);

    return response.status(producer.statusCode).json(producer.data);
  }
}

export { GetProducerByIdController };
