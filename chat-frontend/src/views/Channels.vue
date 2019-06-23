<template>
  <div class="channels h-100 pt-5">
    <div v-if="channels" class="d-flex flex-column h-100">
      <h1 class="p-2 h3 bg-info text-warning">Lista de canais</h1>
      <b-form inline class="bg-info" @submit.prevent="onSubmit">
        <div class="container-fluid">
          <div class="row">
            <b-input
              id="input-key"
              class="col-10 col-md-11"
              placeholder="Buscar canal..."
              v-model="key"
            ></b-input>
            <b-button variant="warning" class="col-2 col-md-1" type="submit">
              <i class="fa fa-search fa-lg text-light"></i>
            </b-button>
          </div>
        </div>
      </b-form>
      <b-list-group>
        <b-list-group-item
          v-for="channel in channels"
          v-bind:key="channel.name"
          :href="'#/channel/'+channel.name"
          class="text-primary h4"
        >#{{channel.name}}</b-list-group-item>
      </b-list-group>
    </div>
    <div v-else>
      <h1>Carregando...</h1>
    </div>
  </div>
</template>

<script>
import ResourceLoader from "../utils/ResourceLoader";
export default {
  data() {
    return {
      channels: null,
      key: ""
    };
  },
  mounted() {
    this.search(null);
  },
  methods: {
    async search(key) {
      let query = key ? { key: key } : null;
      let response = await ResourceLoader.getProtectedResouce(
        "/channels",
        "GET",
        query
      );
      this.channels = response.data;
    },
    onSubmit() {
      this.search(this.key);
    }
  }
};
</script>

<style>
.channels h1 {
  margin-bottom: 0;
}

.channels form {
  padding: 10px;
}

.channels form input[type="text"] {
  border: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.channels form button[type="submit"] {
  border: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
