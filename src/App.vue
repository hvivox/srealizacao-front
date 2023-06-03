<script setup>
//import { RouterLink, RouterView } from "vue-router";
//import cookie from "./service/cookie";
</script>

<script>
export default {
  data() {
    return {
      usuarioDadosLogin: { nome: "Teste_usuário", codigo: "1" },
      louding: "",
    };
  },

  computed: {
    isRotaDiferenteDeLogin() {
      return this.$route.path != "/login";
    },
  },
  provide() {
    return {
      //usuarioProvider: computed(() => this.usuarioDadosLogin),
      usuarioProvider: this.usuarioDadosLogin,
    };
  },
};

//Função para remover o token ao fechar a aplicação / redireciona para login
/*window.addEventListener("beforeunload", removeToken);
function removeToken() {
  cookie.deleteToken();
}*/
</script>

<template>
  <div class="wrapper">
    <!-- Navbar -->

    <notifications
      position="top center"
      group="notificacaolista"
      :width="500"
      :duration="5000"
      classes="vue-notification"
    />
    <nav
      class="main-header navbar navbar-expand navbar-white navbar-light"
      v-if="isRotaDiferenteDeLogin"
    >
      <!-- Left navbar links -->

      <!--MENU PRINCIPALTA ###################################################################################  -->
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" data-widget="pushmenu" href="#" role="button"
            ><i class="fa fa-bars"></i
          ></a>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
          <RouterLink class="nav-link active" to="/"
            >Home <span class="sr-only">(current)</span>
          </RouterLink>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
          <RouterLink class="nav-link" to="/lista">Lista</RouterLink>
        </li>
      </ul>
    </nav>
    <!-- /.navbar -->

    <!-- Main Sidebar Container -->
    <aside class="main-sidebar sidebar-dark-primary elevation-4" v-if="isRotaDiferenteDeLogin">
      <!-- Brand Logo -->
      <router-link to="/" class="brand-link">
        <img
          src="/logo.png"
          alt="AdminLTE Logo"
          class="brand-image img-circle elevation-3"
          style="opacity: 0.8"
        />
        <span class="brand-text font-weight-light">Srealização</span>
      </router-link>

      <!-- Sidebar -->
      <div class="sidebar">
        <!-- Sidebar user panel (optional) -->
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
          <!-- <div class="image">
            <img
              src="/node_modules/admin-lte/dist/img/user2-160x160.jpg"
              class="img-circle elevation-2"
              alt="User Image"
            />
          </div> -->
          <div class="info">
            <a href="#" class="d-block"> {{ usuarioDadosLogin.nome }}</a>
          </div>
        </div>

        <!-- Sidebar Menu -->
        <!-- MENU LATERAL ############################################################################################-->
        <nav class="mt-2">
          <ul
            class="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->

            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="nav-icon fa fa-th"></i>
                <p>Folha de Produtividade</p>
              </a>
            </li>
          </ul>
        </nav>
        <!-- /.sidebar-menu -->
      </div>
      <!-- /.sidebar -->
    </aside>

    <!-- CORPO #################################################################################################################-->
    <div :class="{ 'content-wrapper': isRotaDiferenteDeLogin }">
      <RouterView />
    </div>
    <!-- /.content-wrapper -->

    <!-- Main Footer -->
    <footer class="main-footer" v-if="isRotaDiferenteDeLogin">
      <!-- To the right -->
      <div class="float-right d-none d-sm-inline">Constância e Foco</div>
      <!-- Default to the left -->
      <strong>Copyright &copy; 2022-2022 <RouterLink to="/">Srealização</RouterLink></strong>
      Todos os direitos Reservados.
    </footer>
  </div>
  <!-- ./wrapper -->
</template>

<style>
@import "/../node_modules/font-awesome/css/font-awesome.min.css";
/* @import url('/../node_modules/font-awesome/css/font-awesome.min.css'); */
@import "@/assets/base.css";

* {
  /*bordas para dentro da div*/
  /*box-sizing: border-box;*/
  /* border: 1px dashed blue; */
}

.vue-notification {
  font-size: 18px !important;
  border-left: 0px !important;
  text-align: center !important;
}
.custom-template-icon {
  flex: 0 1 auto;
  color: #15c371;
  font-size: 32px;
  padding: 0 10px;
}
.custom-template-close {
  flex: 0 1 auto;
  padding: 0 20px;
  font-size: 16px;
  opacity: 0.2;
  cursor: pointer;
}
</style>
