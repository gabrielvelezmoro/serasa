import { inject, injectable } from "tsyringe";
import { IProductRepository } from "@modules/farm/repositories/i-product-repository";
import { HttpResponse } from "@shared/helpers";

@injectable()
class GetProductByIdUseCase {
  constructor(
    @inject("ProductRepository")
    private productRepository: IProductRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const product = await this.productRepository.get(id);

    return product;
  }
}

export { GetProductByIdUseCase };
