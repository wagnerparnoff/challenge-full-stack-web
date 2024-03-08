<template>
  <Suspense>
    <v-app>
      <sidebar-menu />
      <v-main>
        <router-view />
      </v-main>
    </v-app>
  </Suspense>
</template>
