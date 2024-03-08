<template>
  <v-col>
    <v-row class="pe-10 justify-center ga-10">
      <search />
      <v-dialog max-width="800">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            v-bind="activatorProps"
            color="surface-variant"
            text="Cadastrar aluno"
            variant="flat"
          ></v-btn>
        </template>
        <template v-slot:default="{ isActive }">
          <v-card title="Cadastre um aluno">
            <register-form />
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text="Cancelar" @click="isActive.value = false"></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" lg="6" md="8" sm="10">
        <v-data-table
          height="500px"
          fixed-header
          :headers="headers"
          :items="studentsData"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon class="me-2" size="small" @click="openEditForm(item)">
              mdi-pencil
            </v-icon>
            <v-icon size="small" @click="deleteStudent(item)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-col>

      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h5"
            >Certeza que deseja deletar esta matrícula?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
              >Cancelar</v-btn
            >
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="deleteItemConfirm"
              >Confirmar</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="editDialog" max-width="500px">
        <v-card>
          <v-card-title>Editar Estudante</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="editedStudent.name"
              label="Nome"
            ></v-text-field>
            <v-text-field
              v-model="editedStudent.email"
              label="E-mail"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn color="blue darken-1" @click="saveEdit">Salvar</v-btn>
            <v-btn color="blue darken-1" @click="cancelEdit">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-col>
</template>

<script setup>
import { ref } from "vue";
import studentService from "../services/students.js";
const studentsData = await studentService.getAllStudents();
const editedStudent = ref(null);
const editDialog = ref(false);
const dialogDelete = ref(false);

const headers = ref([
  {
    title: "Registro Acadêmico",
    align: "start",
    sortable: true,
    key: "ra",
  },
  { title: "Nome", key: "name" },
  { title: "E-mail", key: "email" },
  { title: "CPF", key: "cpf" },
  { title: "Ações", key: "actions", sortable: false },
]);

function openEditForm(item) {
  editedStudent.value = { ...item };
  editDialog.value = true;
}

async function saveEdit() {
  try {
    await studentService.updateStudent(editedStudent.value.id, {
      name: editedStudent.value.name,
      email: editedStudent.value.email,
    });
    studentsData.value = await studentService.getAllStudents();
  } catch (error) {
    console.error("Erro ao editar estudante:", error);
  } finally {
    editDialog.value = false;
  }
}

async function deleteStudent(item) {
  try {
    editedStudent.value = { ...item };
    dialogDelete.value = true;
  } catch (error) {
    console.error("Erro ao deletar estudante:", error);
  }
}

function deleteItemConfirm() {
  try {
    studentService.deleteStudent(editedStudent.value.id);
    studentsData.value = studentsData.value.filter((student) => student.id !== editedStudent.value.id);
  } catch (error) {
    console.error("Erro ao deletar estudante:", error);
  }
  dialogDelete.value = false;
}

function closeDelete() {
  dialogDelete.value = false;
}

function cancelEdit() {
  editDialog.value = false;
}

// const searchStudents = async () => {
//   try {
//     if (filter.value !== "") {
//       if (
//         (filter.value.length === 11 || filter.value.length === 7) &&
//         !isNaN(filter.value)
//       ) {
//         // Se o comprimento for 11 ou 7 e for um número, consideramos como CPF ou RA parcial
//         if (filter.value.length === 11) {
//           const student = await studentService.getByCPF(filter.value);
//           studentsData.value = [student]; // Se você espera um único resultado
//           // Ou se espera uma lista de resultados: studentsData.value = student;
//         } else if (filter.value.length === 7) {
//           const student = await studentService.getByRA(filter.value);
//           studentsData.value = [student]; // Se você espera um único resultado
//           // Ou se espera uma lista de resultados: studentsData.value = student;
//         }
//       } else {
//         console.log("Formato de pesquisa inválido");
//       }
//     } else {
//       // Se o campo de busca estiver vazio, mostrar todos os alunos novamente
//       studentsData.value = await studentService.getAllStudents();
//     }
//   } catch (error) {
//     console.error("Erro ao buscar estudante:", error);
//   }
// };
</script>
