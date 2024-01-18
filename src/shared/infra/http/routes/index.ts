import { Router } from "express";

import { producerRoutes } from "./farm/producer-routes";
import { farmRoutes } from "./farm/farm-routes";

const router = Router();

router.use("/producer", producerRoutes);
router.use("/farm", farmRoutes);

export { router };
