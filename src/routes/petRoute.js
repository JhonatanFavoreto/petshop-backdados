import { Router } from "express";
import * as PetController from "./../controllers/petController.js";

const router = Router();

// Rota GetAll em /
router.get("/", PetController.listarTodos);
// Rota GetById
router.get("/:id", PetController.listarUm);
// Rota post
router.post("/", PetController.criar)
//Rota delete
router.delete("/:id", PetController.apagar)
//Rota update
router.put("/:id", PetController.atualizar)

export default router;