import express from "express";
import contentsRoutes from "./contents";

const router = express.Router();
// "/content"ルートは contentsRoutesで管理
router.use("/content", contentsRoutes);

export default router;
