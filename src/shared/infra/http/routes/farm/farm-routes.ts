import { Router } from "express";
import { CreateFarmController } from "@modules/farm/use-cases/farm/create-farm/create-farm-controller";
import { GetFarmDashboardController } from "@modules/farm/use-cases/farm/get-farm-dashboard/get-farm-dashboard-controller";
const farmRoutes = Router();

const createFarmController = new CreateFarmController();
const getFarmDashboardController = new GetFarmDashboardController();

farmRoutes.post("/", createFarmController.handle);
farmRoutes.get("/dashboard/:idProducer", getFarmDashboardController.handle);

export { farmRoutes };
