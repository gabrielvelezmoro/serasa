import { inject, injectable } from "tsyringe";
import { IProductRepository } from "@modules/farm/repositories/i-product-repository";
import { HttpResponse } from "@shared/helpers/http";
import { cpf as validator } from "cpf-cnpj-validator";
import { AppError } from "@shared/errors/app-error";

interface IRequest {
  nome: string;
}

@injectable()
class CreateProductUseCase {
  constructor(
    @inject("ProductRepository")
    private productRepository: IProductRepository
  ) {}

  async execute({ nome }: IRequest): Promise<HttpResponse> {
    return this.productRepository
      .create({
        nome,
      })
      .then((newProduct) => {
        return newProduct;
      });
  }
}

export { CreateProductUseCase };
