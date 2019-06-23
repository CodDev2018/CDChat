<template>
  <header>
    <b-navbar toggleable="lg" type="dark" variant="dark" class="fixed-top">
      <b-navbar-brand href="#/">
        <i class="fa fa-comment text-warning"></i> CDChat
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#/login">Entrar</b-nav-item>
          <b-nav-item href="#/register">Cadastrar-se</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>