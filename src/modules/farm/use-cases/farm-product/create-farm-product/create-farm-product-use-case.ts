import { inject, injectable } from "tsyringe";
import { IFarmProductRepository } from "@modules/farm/repositories/i-farm-product-repository";
import { HttpResponse } from "@shared/helpers/http";

interface IRequest {
  idProduct: number;
  idFarm: number;
}

@injectable()
class CreateFarmProductUseCase {
  constructor(
    @inject("FarmProductRepository")
    private farmProductRepository: IFarmProductRepository
  ) {}

  async execute({ idFarm, idProduct }: IRequest): Promise<HttpResponse> {
    return this.farmProductRepository
      .create({
        idFarm,
        idProduct,
      })
      .then((newFarmProduct) => {
        return newFarmProduct;
      });
  }
}

export { CreateFarmProductUseCase };
