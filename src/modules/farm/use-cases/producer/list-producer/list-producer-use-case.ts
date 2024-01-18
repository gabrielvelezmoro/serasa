import { inject, injectable } from "tsyringe";
import { IProducerRepository } from "@modules/farm/repositories/i-producer-repository";
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
    @inject("ProducerRepository")
    private pessoaRepository: IProducerRepository
  ) {}

  async execute({
    search,
    page,
    rowsPerPage,
    columnOrder,
  }: IRequest): Promise<HttpResponse> {
    const pessoas = await this.pessoaRepository.list();

    return pessoas;
  }
}

export { ListProducerUseCase };
