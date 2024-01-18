import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateFarmUseCase } from "./create-farm-use-case";
import { GetProducerByCpfUseCase } from "../../producer/get-producer-by-cpf/get-producer-by-cpf-use-case";

class CreateFarmController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      cpfOuCNPJ,
      nomeDoProdutor,
      nomeDaFazenda,
      cidade,
      estado,
      areaTotalHectFazenda,
      areaAgricultavelHect,
      vegetationArea,
    } = request.body;

    const createFarmUseCase = container.resolve(CreateFarmUseCase);
    const getPessoaUseCase = container.resolve(GetPessoaUseCase);

    const result = await createFarmUseCase
      .execute({
        idPessoa,
        titulo,
        descricao,
      })
      .then((anotacaoResult) => {
        return anotacaoResult;
      })
      .catch((error) => {
        return error;
      });

    return response.status(result.statusCode).json(result);
  }
}

export { CreateFarmController };
