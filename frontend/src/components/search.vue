<template>
  <v-text-field style="max-width: 500px;"
    v-model="props.filter"
    prepend-inner-icon="mdi-magnify"
    label="Digite um RA ou CPF"
  ></v-text-field>
</template>

<script setup>
const props = defineProps({
  filter: Object,
})

</script>
