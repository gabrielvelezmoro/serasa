import { ICreateFarmDTO } from "@modules/farm/dtos/farm-dto/i-create-farm-dto";
import { HttpResponse } from "@shared/helpers";

interface IFarmRepository {
  create(data: ICreateFarmDTO): Promise<HttpResponse>;

  list(): Promise<HttpResponse>;

  get(id: string): Promise<HttpResponse>;

  update(data: ICreateFarmDTO): Promise<HttpResponse>;

  delete(id: string): Promise<HttpResponse>;
}

export { IFarmRepository };
