import { Express, Router} from "express";
import authRoutes from "./auth.route";
import userRoutes from "./user.route";
import permissionsRoutes from "./permissions.route"

const router = Router();

router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/user", userRoutes);
router.use("/api/v1/permissions", permissionsRoutes);

export default router;