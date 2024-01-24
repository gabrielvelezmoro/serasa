import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateFarmUseCase } from "./create-farm-use-case";
import { GetProducerByCpfUseCase } from "../../producer/get-producer-by-cpf/get-producer-by-cpf-use-case";
import { CreateProducerUseCase } from "../../producer/create-producer/create-producer-use-case";
import { GetProductByIdUseCase } from "../../product/get-product-by-id/get-product-by-id-use-case";
import { CreateFarmProductUseCase } from "../../farm-product/create-farm-product/create-farm-product-use-case";
import { cpf as cpfValidator, cnpj as cnpjValidator } from "cpf-cnpj-validator";
import { AppError } from "@shared/errors/app-error";

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
    const createProducerUseCase = container.resolve(CreateProducerUseCase);
    const getProducerByCpfUseCase = container.resolve(GetProducerByCpfUseCase);
    const getProductByIdUseCase = container.resolve(GetProductByIdUseCase);
    const createFarmProductUseCase = container.resolve(
      CreateFarmProductUseCase
    );

    if (!cpfValidator.isValid(cpfOuCNPJ) && !cnpjValidator.isValid(cpfOuCNPJ))
      throw new AppError("cpf ou cnpj invalido");

    if (request.body.culturaId.length) {
      for (let index = 0; index < request.body.culturaId.length; index++) {
        let product = await getProductByIdUseCase.execute(
          request.body.culturaId[index]
        );
        if (product.data === null)
          throw new AppError("cultura não encontrada", 404);
      }
    }

    let producer = await getProducerByCpfUseCase.execute(cpfOuCNPJ);

    if (producer.statusCode === 500) {
      producer = await createProducerUseCase.execute({
        nome: nomeDoProdutor,
        cpfOuCNPJ,
      });
    }

    if (areaAgricultavelHect + vegetationArea > areaTotalHectFazenda) {
      throw new AppError(
        "área total deve ser menor que a soma da area da vegetação com a area agricultavel"
      );
    }

    const result = await createFarmUseCase
      .execute({
        idProducer: producer.data.id,
        areaAgricultavelHect: areaAgricultavelHect,
        areaTotalHectFazenda: areaTotalHectFazenda,
        vegetationArea,
        cidade,
        estado,
        nomeDaFazenda,
      })
      .then((farmResult) => {
        return farmResult;
      })
      .catch((error) => {
        return error;
      });

    if (request.body.culturaId.length) {
      for (let index = 0; index < request.body.culturaId.length; index++) {
        await createFarmProductUseCase.execute({
          idFarm: result.data.id,
          idProduct: request.body.culturaId[index],
        });
      }
    }

    return response.status(result.statusCode).json(result.data);
  }
}

export { CreateFarmController };
