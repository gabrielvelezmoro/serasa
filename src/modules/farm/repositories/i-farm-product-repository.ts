import { IFarmProductDTO } from "@modules/farm/dtos/farm-product-dto/i-create-farm-product-dto";
import { HttpResponse } from "@shared/helpers";

interface IFarmProductRepository {
  create(data: IFarmProductDTO): Promise<HttpResponse>;

  list(): Promise<HttpResponse>;

  getByFarmId(idFarm: number): Promise<HttpResponse>;

  delete(id: string): Promise<HttpResponse>;
}

export { IFarmProductRepository };
