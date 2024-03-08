<template>
  <v-navigation-drawer
    expand-on-hover
    v-model="drawer"
    :rail="rail"
    permanent
    @click="rail = false"
  >
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        subtitle="Admin"
        title="Admin"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-home"
        title="Inicio"
        value="myfiles"
        href="/"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account-multiple"
        title="Alunos"
        value="students"
        href="/students"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account-multiple"
        title="Cadastrar aluno"
        href="/register"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from "vue";

const drawer = ref(true);
const rail = ref(true);

</script>
