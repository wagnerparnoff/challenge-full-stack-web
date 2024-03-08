<template>
  <v-row justify="center">
    <v-col cols="12" lg="6" md="8" sm="10">
      <form>
        <v-text-field
          v-model="state.name"
          :error-messages="v$.name.$errors.map((e) => e.$message)"
          label="Name"
          required
          @blur="v$.name.$touch"
          @input="v$.name.$touch"
        ></v-text-field>

        <v-text-field
          v-model="state.email"
          :error-messages="v$.email.$errors.map((e) => e.$message)"
          label="E-mail"
          required
          @blur="v$.email.$touch"
          @input="v$.email.$touch"
        ></v-text-field>

        <v-text-field
          v-model="state.ra"
          :error-messages="v$.ra.$errors.map((e) => e.$message)"
          label="RA - Registro Acadêmico"
          required
          @blur="v$.ra.$touch"
          @input="v$.ra.$touch"
        ></v-text-field>

        <v-text-field
          v-model="state.cpf"
          :error-messages="v$.cpf.$errors.map((e) => e.$message)"
          label="CPF"
          required
          @blur="v$.cpf.$touch"
          @input="v$.cpf.$touch"
        ></v-text-field>

        <v-btn class="me-4" @click="submitForm"> Cadastrar </v-btn>
        <v-btn @click="clear"> Limpar </v-btn>
      </form>
    </v-col>
  </v-row>
</template>

<script setup>
import { reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { email, required, minLength, maxLength, numeric } from "@vuelidate/validators";
import studentsService from "@/services/students";

const initialState = {
  name: "",
  email: "",
  ra: "",
  cpf: ""
};

const state = reactive({
  ...initialState,
});

const rules = {
  name: { required, minLength: minLength(1), maxLength: maxLength(50), regex: /^[a-zA-Z\s]*$/ },
  email: { required, email },
  ra: { required, minLength: minLength(6), maxLength: maxLength(6), numeric },
  cpf: { required, minLength: minLength(11), maxLength: maxLength(11), numeric }
};

const v$ = useVuelidate(rules, state);

function clear() {
  v$.value.$reset();

  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value;
  }
}

async function submitForm() {
  try {
    formatCPF();
    if (state.id) {
      await studentsService.updateStudent(state.id, state);
      alert("Aluno atualizado com sucesso!");
    } else {
      await studentsService.createStudent(state);
      alert("Aluno criado com sucesso!");
    }
    clear();
  } catch (error) {
    console.error("Erro ao enviar formulário:", error);
    alert("Erro ao enviar formulário. Por favor, tente novamente.");
  }
}

function formatCPF() {
  state.cpf = state.cpf.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}
</script>
