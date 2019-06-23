<template>
  <div class="container-fl pt-5">
    <div class="row">
      <b-form @submit.prevent="onSubmit" class="col-12 form-sing pt-5">
        <p>
          <i class="fa fa-comment text-warning fa-5x"></i>
        </p>
        <h1 class="h3 mb-3 font-weight-normal">Registrar no chat</h1>

        <b-alert
          class="text-left"
          :show="message.show"
          dismissible
          :variant="message.severity"
        >{{message.message}}</b-alert>

        <b-form-input
          id="inputName"
          v-model="form.name"
          type="text"
          required
          placeholder="Seu nome completo..."
        ></b-form-input>

        <b-form-input
          id="inputEmail"
          v-model="form.email"
          type="email"
          required
          placeholder="Seu email..."
        ></b-form-input>

        <b-form-input
          id="inputPassword"
          v-model="form.password"
          type="password"
          required
          placeholder="Sua senha..."
        ></b-form-input>

        <b-button type="submit" variant="primary" class="btn-block mt-2">Enviar</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import ResouceLoader from "../utils/ResourceLoader";

export default {
  name: "register",
  data() {
    return {
      message: {
        show: false,
        severity: "danger",
        message: ""
      },
      form: {
        name: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async onSubmit() {
      try {
        let user = await ResouceLoader.getResouce(
          "/register",
          "POST",
          this.form
        );
        if (user.status === "success") {
          this.message.show = true;
          this.message.severity = "success";
          this.message.message =
            "Cadastro efetuado com sucesso, redirecionando para login...";

          setTimeout(() => {
            this.$router.push("/login");
          }, 3000);
        }
      } catch (err) {
        this.message.show = true;
        this.message.message = err.message;
      }
    }
  }
};
</script>

<style>
.form-sing {
  margin: 0 auto;
  width: 100vw;
  max-width: 330px;
  text-align: center;
}
.form-sing input[type="email"] {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.form-sing input[type="password"] {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>