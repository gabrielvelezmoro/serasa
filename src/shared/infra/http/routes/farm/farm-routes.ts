import { Router } from "express";
import { CreateFarmController } from "@modules/farm/use-cases/farm/create-farm/create-farm-controller";
// import { ListAnotacaoController } from "@modules/farm/use-cases/farm/list-anotacao/list-anotacao-controller";
// import { GetAnotacaoController } from "@modules/farm/use-cases/farm/get-anotacao/get-anotacao-controller";
// import { UpdateAnotacaoController } from "@modules/farm/use-cases/farm/update-anotacao/update-anotacao-controller";
// import { DeleteAnotacaoController } from "@modules/farm/use-cases/farm/delete-anotacao/delete-anotacao-controller";

const farmRoutes = Router();

const createFarmController = new CreateFarmController();
// const listAnotacaoController = new ListAnotacaoController();
// const getAnotacaoController = new GetAnotacaoController();
// const updateAnotacaoController = new UpdateAnotacaoController();
// const deleteAnotacaoController = new DeleteAnotacaoController();

farmRoutes.post("/", createFarmController.handle);
// farmRoutes.post("/list", listFarmController.handle);
// farmRoutes.get("/:id", getFarmController.handle);
// farmRoutes.put("/", updateFarmController.handle);
// farmRoutes.delete("/:id", deleteFarmController.handle);

export { farmRoutes };
