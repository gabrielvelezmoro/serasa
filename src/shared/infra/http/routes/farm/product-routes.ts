import { Router } from "express";
import { CreateProductController } from "@modules/farm/use-cases/product/create-product/create-product-controller";
import { ListProducerController } from "@modules/farm/use-cases/product/list-product/list-product-controller";

const productRoutes = Router();

const createProductController = new CreateProductController();
const listProducerController = new ListProducerController();

productRoutes.post("/", createProductController.handle);
productRoutes.get("/", listProducerController.handle);
// farmRoutes.get("/:id", getFarmController.handle);

export { productRoutes };
