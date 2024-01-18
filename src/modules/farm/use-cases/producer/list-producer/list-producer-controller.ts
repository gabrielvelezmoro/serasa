import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListProducerUseCase } from "./list-producer-use-case";

class ListProducerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { search, page, rowsPerPage, columnOrder } = request.body;

    const listPessoaUseCase = container.resolve(ListProducerUseCase);

    const producers = await listPessoaUseCase.execute({
      search: search as string,
      page: page as number,
      rowsPerPage: rowsPerPage as number,
      columnOrder: columnOrder as Array<"ASC" | "DESC">,
    });

    return response.json(producers);
  }
}

export { ListProducerController };
