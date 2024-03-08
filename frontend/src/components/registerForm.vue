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
import { email, required } from "@vuelidate/validators";
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
  name: { required },
  email: { required, email },
  ra: { required },
  cpf: { required },
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
</script>
