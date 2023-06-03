<script setup>
import axios from "axios";
//import Cookies from "js-cookie";
import cookie from "../service/cookie";

//axios.defaults.withCredentials = true;
</script>
<script>
export default {
  data() {
    return {
      entidade: {
        usuario: "",
        senha: "",
      },
      mensagem: "",
      isLoading: false,
      isHouveErro: false,
    };
  },

  methods: {
    logar() {
      //let url_csrf = "/sanctum/csrf-cookie";
      let url = "/api/logarjwt";

      this.mensagem = "";
      this.isLoading = true;

      axios
        .post(url, this.entidade)
        .then((response) => {
          if (response.data.token) {
            const token = response.data.token;
            cookie.setToken(token);
            //Cookies.set("_token", token, { expires: 30 });
            this.isHouveErro = false;
            this.mensagem = "Usuário logado com sucesso, aguarde...";
            this.$router.push({ name: "home" });
          }
        })
        .catch((errors) => {
          this.entidade.usuario = null;
          this.entidade.senha = null;
          //console.log(errors);
          let mensagemAPI = errors.response?.data?.mensagem;
          let mensagemDoCliente = errors.data;
          this.mensagem = typeof mensagemAPI == "undefined" ? mensagemDoCliente : mensagemAPI;

          this.isHouveErro = true;
        })
        .finally(() => {
          this.isLoading = false;
          document.getElementById("usuario").focus();
        });

      /*axios.get(url_csrf).then((response) => {
        axios
          .post(url, this.entidade)
          .then((response) => {
            if (response.data.token) {
              this.isHouveErro = false;
              this.mensagem = "Usuário logado com sucesso, aguarde...";
              sessionStorage.setItem("token", response.data.token);
              this.$router.push({ name: "lista" });
              //document.cookie = "token=" + response.data.token + ";SameSite=Lax";
            }
          })
          .catch((errors) => {
            this.entidade.usuario = null;
            this.entidade.senha = null;
            this.mensagem = errors.response.data.mensagem;
            this.isHouveErro = true;
          })
          .finally(() => {
            this.isLoading = false;
          });
      });*/
    },
  },
};
</script>

<template>
  <div>
    <div class="hold-transition login-page">
      <div class="login-box">
        <div class="text-center clearfix">
          <div
            v-show="mensagem"
            class="alert alert-dismissible"
            :class="isHouveErro ? 'alert-danger' : 'alert-success'"
          >
            {{ mensagem }} <br />
          </div>
        </div>

        <div v-if="isLoading" class="text-center clearfix">
          <i class="fa fa-spinner fa-spin fa-4x fa-fw"></i>
        </div>

        <div class="card card-outline card-primary">
          <div class="card-header text-center">
            <RouterLink class="h1" to="/login"><b>Sistema</b></RouterLink>
          </div>
          <div class="card-body">
            <p class="login-box-msg">Sistema para Auxiliar a produtividade</p>

            <form action="" method="POST" @submit.stop.prevent="logar($event)">
              <div class="input-group mb-3">
                <input
                  id="usuario"
                  class="form-control"
                  name="usuario"
                  type="text"
                  placeholder="Usuário"
                  v-model="entidade.usuario"
                  required
                />

                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fa fa-envelope"></span>
                  </div>
                </div>
              </div>

              <div class="input-group mb-3">
                <input
                  id="senha"
                  class="form-control"
                  name="senha"
                  v-model="entidade.senha"
                  type="password"
                  placeholder="Senha"
                  required
                />

                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fa fa-lock" aria-hidden="true"></span>
                  </div>
                </div>
              </div>
              <div class="row">
                <!-- /.col -->
                <div class="col-4">
                  <button type="submit" class="btn btn-primary btn-block">login</button>
                </div>
                <!-- /.col -->
              </div>
            </form>

            <p class="mb-1">
              <a href="forgot-password.html">Esqueceu a senha</a>
            </p>
            <p class="mb-0">
              <a href="register.html" class="text-center">Ainda não é usuário?</a>
            </p>
          </div>
          <!-- /.card-body -->
        </div>
        <!-- /.card -->
      </div>
      <!-- /.login-box -->
    </div>
  </div>
</template>
