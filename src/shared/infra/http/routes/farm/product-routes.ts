import { Router } from "express";
import { CreateProductController } from "@modules/farm/use-cases/product/create-product/create-product-controller";
import { ListProductController } from "@modules/farm/use-cases/product/list-product/list-product-controller";

const productRoutes = Router();

const createProductController = new CreateProductController();
const listProductController = new ListProductController();

productRoutes.post("/", createProductController.handle);
productRoutes.get("/", listProductController.handle);
// farmRoutes.get("/:id", getFarmController.handle);

export { productRoutes };
