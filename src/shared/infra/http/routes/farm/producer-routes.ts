import { Router } from "express";
import { CreateProducerController } from "@modules/farm/use-cases/producer/create-producer/create-producer-controller";
import { ListProducerController } from "@modules/farm/use-cases/producer/list-producer/list-producer-controller";
import { GetProducerController } from "@modules/farm/use-cases/producer/get-producer-by-id/get-producer-by-id-controller";
import { UpdateProducerController } from "@modules/farm/use-cases/producer/update-producer/update-producer-controller";
import { DeleteProducerController } from "@modules/farm/use-cases/producer/delete-producer/delete-producer-controller";

const producerRoutes = Router();

const createProducerController = new CreateProducerController();
const listProducerController = new ListProducerController();
const getProducerController = new GetProducerController();
const updateProducerController = new UpdateProducerController();
const deleteProducerController = new DeleteProducerController();

producerRoutes.post("/", createProducerController.handle);
producerRoutes.get("/", listProducerController.handle);
producerRoutes.get("/:id", getProducerController.handle);
producerRoutes.put("/:id", updateProducerController.handle);
producerRoutes.delete("/:id", deleteProducerController.handle);

export { producerRoutes };
