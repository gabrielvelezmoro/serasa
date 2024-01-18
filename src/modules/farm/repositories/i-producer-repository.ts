import { ICreateProducerDTO } from "@modules/farm/dtos/producer-dto/i-create-producer-dto";
import { IUpdateProducerDTO } from "@modules/farm/dtos/producer-dto/i-update-producer-dto";
import { HttpResponse } from "@shared/helpers";

interface IProducerRepository {
  // create
  create(data: ICreateProducerDTO): Promise<HttpResponse>;

  list(): Promise<HttpResponse>;

  get(id: string): Promise<HttpResponse>;

  getByCpf(cpf: string): Promise<HttpResponse>;

  update(data: IUpdateProducerDTO): Promise<HttpResponse>;

  delete(id: string): Promise<HttpResponse>;
}

export { IProducerRepository };
