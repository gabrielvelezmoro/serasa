import { Router } from "express";

import { producerRoutes } from "./farm/producer-routes";
import { farmRoutes } from "./farm/farm-routes";
import { productRoutes } from "./farm/product-routes";

const router = Router();

router.use("/producer", producerRoutes);
router.use("/product", productRoutes);
router.use("/farm", farmRoutes);

export { router };
