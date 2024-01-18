import { inject, injectable } from "tsyringe";
import { IProductRepository } from "@modules/farm/repositories/i-product-repository";
import { HttpResponse } from "@shared/helpers";

interface IRequest {
  search: string;
  page: number;
  rowsPerPage: number;
  columnOrder: Array<"ASC" | "DESC">;
}

@injectable()
class ListProducerUseCase {
  constructor(
    @inject("ProductRepository")
    private productRepository: IProductRepository
  ) {}

  async execute(): Promise<HttpResponse> {
    const products = await this.productRepository.list();

    return products;
  }
}

export { ListProducerUseCase };
