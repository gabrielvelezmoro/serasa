import { inject, injectable } from "tsyringe";
import { Farm } from "@modules/farm/infra/typeorm/entities/farm";
import { IFarmRepository } from "@modules/farm/repositories/i-farm-repository";

interface IRequest {
  nomeDoProdutor: number;
  nomeDaFazenda: string;
  cidade: string;
  estado: string;
  areaTotalHectFazenda: number;
  areaAgricultavelHect: number;
  vegetationArea: number;
}

@injectable()
class CreateFarmUseCase {
  constructor(
    @inject("FarmRepository")
    private anotacaoRepository: IFarmRepository
  ) {}

  async execute({
    nomeDaFazenda,
    nomeDoProdutor,
    cidade,
    estado,
    areaTotalHectFazenda,
    areaAgricultavelHect,
    vegetationArea,
  }: IRequest): Promise<Farm> {
    const result = this.anotacaoRepository
      .create({})
      .then((newFarm) => {
        return newFarm;
      })
      .catch((error) => {
        return error;
      });

    return result;
  }
}

export { CreateFarmUseCase };
