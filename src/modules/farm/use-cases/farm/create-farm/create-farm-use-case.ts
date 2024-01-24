import { inject, injectable } from "tsyringe";
import { Farm } from "@modules/farm/infra/typeorm/entities/farm";
import { IFarmRepository } from "@modules/farm/repositories/i-farm-repository";

interface IRequest {
  idProducer: number;
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
    private farmRepository: IFarmRepository
  ) {}

  async execute({
    nomeDaFazenda,
    idProducer,
    cidade,
    estado,
    areaTotalHectFazenda,
    areaAgricultavelHect,
    vegetationArea,
  }: IRequest): Promise<Farm> {
    const result = this.farmRepository
      .create({
        nome: nomeDaFazenda,
        cidade,
        idProducer,
        estado,
        produceble_area: areaAgricultavelHect,
        total_area: areaTotalHectFazenda,
        vegetation_area: vegetationArea,
      })
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
