import { Router } from "express";
import * as PetController from "./../controllers/petController.js";

const router = Router();

// Rota GetAll em /
router.get("/", PetController.listarTodos);
// Rota GetById
router.get("/:id", PetController.listarUm);

export default router;