<template>
  <header>
    <b-navbar toggleable="lg" type="dark" variant="dark" class="fixed-top">
      <b-navbar-brand href="#/channels">
        <i class="fa fa-comment text-warning"></i> CDChat
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item
            v-for="channel in channels"
            v-bind:key="channel.name"
            :href="'#/channel/'+channel.name"
          >#{{channel.name}}</b-nav-item>
          <b-nav-item @click="logout">Sair</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
import ResourceLoader from "../utils/ResourceLoader";
export default {
  data() {
    return {
      channels: []
    }
  },
  async mounted() {
      let response = await ResourceLoader.getProtectedResouce(
        "/channels",
        "GET"
      );
      this.channels = response.data;
  },
  methods: {
    logout() {
      delete sessionStorage.user;
      this.$router.push("/");
    }
  }
};
</script>
