import express from "express";
import {
  createStudent,
  getAllStudent,
  getByid,
  updateStudent,
  deleteStudent,
  getByCPF,
  getByRA,
} from "../controllers/studentController.js";

const router = express.Router();

router.post("/alunos", createStudent);
router.get("/alunos", getAllStudent);
router.get("/alunos/:id", getByid);
router.put("/alunos/:id", updateStudent);
router.delete("/alunos/:id", deleteStudent);

router.get("/alunos/cpf/:cpf", getByCPF);
router.get("/alunos/ra/:ra", getByRA);

export default router;
