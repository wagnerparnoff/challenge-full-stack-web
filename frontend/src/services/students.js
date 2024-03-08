import { useHttp } from "@/composables/use-http";

const students = () => {
  const http = useHttp;
  return {
    async getAllStudents() {
      const data = await http("/alunos", {
        method: "GET",
      });
      return data;
    },

    async getByid(id) {
      const data = await http(`/alunos/${id}`, {
        method: "GET",
      });
      return data;
    },

    async getByCPF(cpf) {
      const data = await http(`/alunos/cpf/${cpf}`, {
        method: "GET",
      });
      return data;
    },

    async getByRA(ra) {
      const data = await http(`/alunos/ra/${ra}`, {
        method: "GET",
      });
      return data;
    },

    async createStudent(state) {
      const data = await http("/alunos", {
        body: JSON.stringify(state),
        method: "POST",
      });
      return data;
    },

    async updateStudent(id, state) {
      const data = await http(`/alunos/${id}`, {
        body: JSON.stringify(state),
        method: "PUT",
      });
      return data;
    },

    async deleteStudent(id) {
      const data = await http(`/alunos/${id}`, {
        method: "DELETE",
      });
      return data;
    },
  };
};
export default students();
