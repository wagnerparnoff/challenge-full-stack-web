import studentService from "../services/studentService.js";
import Student from "../models/studentModel.js";
import {Op} from 'sequelize'

export async function createStudent(req, res, next) {
  try {
    const studentData = req.body;

    const existingStudent = await Student.findOne({
      where: {
        [Op.or]: [{ ra: studentData.ra }, { cpf: studentData.cpf }],
      },
    });

    if (existingStudent) {
      return res.status(400).json({ message: "Estudante já existe" });
    }

    const student = await studentService.createStudent(studentData);
    res.status(201).json(student);
  } catch (error) {
    next(error);
  }
}

export async function getAllStudent(req, res, next) {
  try {
    const students = await studentService.getAllStudent();
    res.json(students);
  } catch (error) {
    next(error);
  }
}

export async function getByid(req, res, next) {
  try {
    const { id } = req.params;
    const student = await studentService.getById(id);
    if (!student) {
      return res.status(404).json({ message: "Estudante não encontrado" });
    }
    res.json(student);
  } catch (error) {
    next(error);
  }
}

export async function updateStudent(req, res, next) {
  try {
    const { id } = req.params;
    const studentData = req.body;
    const student = await studentService.updateStudent(id, studentData);
    res.json(student);
  } catch (error) {
    next(error);
  }
}

export async function deleteStudent(req, res, next) {
  try {
    const { id } = req.params;
    await studentService.deleteStudent(id);
    res.status(200).json({ message: "Estudante excluído com sucesso" });
  } catch (error) {
    next(error);
  }
}

export async function getByCPF(req, res, next) {
  try {
    const { cpf } = req.params;
    const student = await Student.findOne({ where: { cpf } });
    if (!student) {
      return res
        .status(404)
        .json({ message: "Estudante com CPF não encontrado" });
    }
    res.json(student);
  } catch (error) {
    next(error);
  }
}

export async function getByRA(req, res, next) {
  try {
    const { ra } = req.params;
    const student = await Student.findOne({ where: { ra } });
    if (!student) {
      return res
        .status(404)
        .json({ message: "Estudante com RA não encontrado" });
    }
    res.json(student);
  } catch (error) {
    next(error);
  }
}

