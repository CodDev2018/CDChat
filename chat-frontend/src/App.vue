<template>
  <div id="app" class="vh-100">
    <div v-if="isAuthorized()">
      <NavbarPrivate/>
    </div>
    <div v-else>
      <NavbarPublic/>
    </div>
    <router-view/>
    <MyFooter/>
  </div>
</template>

<script>
import NavbarPublic from "./components/NavbarPublic";
import NavbarPrivate from "./components/NavbarPrivate";
import MyFooter from "./components/MyFooter";
export default {
  name: "app",
  components: {
    NavbarPublic,
    NavbarPrivate,
    MyFooter
  },
  methods: {
    isAuthorized() {
      return sessionStorage.user;
    }
  }
};
</script>

<style>
html,
body {
  min-height: 100vh;
}
</style>
