<template>
  <div class="vh-100 pt-5">
    <b-jumbotron bg-variant="white" text-variant="dark" border-variant="white">
      <template slot="header">
        <div class="text-center">
          <i class="fa fa-comment fa-3x text-warning"></i>
        </div>
      </template>

      <template slot="lead">
        <div class="text-center">
          Seja bem vindo ao
          <strong>CDChat</strong>!
        </div>
      </template>

      <hr class="my-4">
      <div class="text-center">
        <p>Esse é o chat em tempo real da CodDev feito com ExpressJS, VueJS e Socket.io.</p>

        <b-button variant="primary" href="#/login">Entrar</b-button>&nbsp;
        <b-button variant="warning" href="#/register">Cadastrar-se</b-button>
      </div>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {}
};
</script>
