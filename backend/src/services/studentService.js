import Student from "../models/studentModel.js";

class StudentService {
  async createStudent(studentData) {
    try {
      const student = await Student.create(studentData);
      return student;
    } catch (error) {
      throw new Error("Erro ao criar estudante");
    }
  }

  async getAllStudent() {
    try {
      const student = await Student.findAll();
      return student;
    } catch (error) {
      throw new Error("Erro ao obter estudantes");
    }
  }

  async getById(studentId) {
    try {
      const student = await Student.findByPk(studentId);
      if (!student) {
        throw new Error("Estudante não encontrado");
      }
      return student;
    } catch (error) {
      throw new Error("Erro ao obter estudante por ID");
    }
  }

  async updateStudent(studenId, studentData) {
    try {
      const student = await Student.findByPk(studenId);
      if (!student) {
        throw new Error("Estudante não encontrado");
      }
      await student.update(studentData);
      return student;
    } catch (error) {
      throw new Error("Erro ao atualizar estudante");
    }
  }

  async deleteStudent(studenId) {
    try {
      const student = await Student.findByPk(studenId);
      if (!student) {
        throw new Error("Estudante não encontrado");
      }
      await student.destroy();
    } catch (error) {
      throw new Error("Erro ao excluir estudante");
    }
  }

}

export default new StudentService();
