import { ICreateProductDTO } from "@modules/farm/dtos/product-dto/i-create-producer-dto";
import { HttpResponse } from "@shared/helpers";

interface IProductRepository {
  create(data: ICreateProductDTO): Promise<HttpResponse>;

  list(): Promise<HttpResponse>;

  get(id: string): Promise<HttpResponse>;
}

export { IProductRepository };
