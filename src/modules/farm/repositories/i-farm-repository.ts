import { ICreateFarmDTO } from "@modules/farm/dtos/farm-dto/i-create-farm-dto";
import { HttpResponse } from "@shared/helpers";

interface IFarmRepository {
  // create
  create(data: ICreateFarmDTO): Promise<HttpResponse>;

  // list
  list(
    search: string,
    page: number,
    rowsPerPage: number,
    columnOrder: ("ASC" | "DESC")[]
  ): Promise<HttpResponse>;

  // get
  get(id: string): Promise<HttpResponse>;

  // update
  update(data: ICreateFarmDTO): Promise<HttpResponse>;

  // delete
  delete(id: string): Promise<HttpResponse>;
}

export { IFarmRepository };
