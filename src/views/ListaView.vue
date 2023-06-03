<script setup>
import TituloDaPagina from "../components/TituloDaPagina.vue";
import ModalExcluirItem from "../components/ModalExcluirItem.vue";
import axios from "axios";
</script>

<script>
export default {
  inject: ["usuarioProvider"],
  data() {
    return {
      entidade: {},
      indiceArray: "",
      usuarioProviderRecebido: this.usuarioProvider,
      listaEntidades: [],
      titulo: "",
      buscaEntidade: "",
      isErroResposta: false,
      isLoading: true,
    };
  },

  mounted() {
    this.carregarLista();
  },

  computed: {
    listaEntidadesFiltrada: {
      get: function () {
        return this.listaEntidades.filter(function (entidade) {
          if (this.buscaEntidade != "") {
            if (entidade.FOCO.toLowerCase().indexOf(this.buscaEntidade.toLowerCase()) > -1) {
              return true;
            } else {
              return false;
            }
          } else {
            return true;
          }
        }, this);
      },

      set: function (novaListaEntidade) {
        this.listaEntidades = novaListaEntidade;
      },
    },
  },

  methods: {

    prepararInativarItem(entidade, index) {

      this.entidade = entidade;
      this.indiceArray = index; //indice do item a ser removido
    },

    remove($event) {
      let entidade = $event;

      //const indiceEncontrado = this.listaEntidades.indexOf(entidade);
      // se não encontra o index o valor será -1
      if (this.indiceArray > -1) {
        let url = "/api/folha";

        // remove entidade da lista
        this.listaEntidades.splice(this.indiceArray, 1);

        axios
          .patch(url, this.entidade)
          .then((response) => {
            console.log("LOGIN TESTE");
            //MSG SUCESSO COLOCAR AQUI
            this.carregarLista();
          })
          .catch((error) => {
            this.isErroResposta = true;
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
      /// this.listaEntidades = this.listaEntidades.filter((t) => t !== indiceEncontrado);

    inativarItemEmitidoPeloModal($event) {
      // se não encontra o index o valor será -1
      if (this.indiceArray > -1) {
        //this.listaEntidades.indexOf(entidade);
        // remove entidade da lista
        this.listaEntidades.splice(this.indiceArray, 1);
        this.inativarItem();
      }
    },

    inativarItem() {
      this.isLoading = true;
      let url = "/api/folha/" + this.entidade.IDFOLHA;
      const data = {
        STATUS: 0,
      };

      axios
        .patch(url, data)
        .then((response) => {
          let mensagemRetorno = response.data.mensagem;

          this.$notify({
            group: "notificacaolista",
            text: mensagemRetorno,
            type: "success",
            position: "top center",
          });

          ///console.log(response);
        })
        .catch((error) => {
          this.isErroResposta = true;
        })
        .finally(() => {
          this.isLoading = false;
        });

    },

    carregarLista() {
      // .get(" https://jsonplaceholder.typicode.com/posts ")
      axios
        .get("/api/folha")
        .then((response) => {
          this.listaEntidades = response.data;
        })
        .catch((error) => {
          this.isErroResposta = true;
        })
        .finally(() => {
          this.isLoading = false;
        });

      /*fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => {
          this.listaEntidades = json;
        });*/
    },

    direcionaParaEdicao: function (entidade) {
      this.$router.push({
        name: "editarFolha",
        params: {
          id: entidade.IDFOLHA,
        },
      });
      // alert("clicou!!!  " + entidade.nome);
    },
  },

  /*
 prepararEdicaoLista() {
      // SE TELA DE CADASTRO ENVIAR UM PARAMETRO
      if (typeof this.$route.params.entidade === "string") {
        //if (typeof this.$route.params.entidade === "object") {
        this.entidade = this.$route.params.entidade;
        this.entidade = JSON.parse(this.entidade);
        this.editarEntidade(this.entidade);
        // editarEntidade(this.entidade);
      }
    },

    editarEntidade(entidade) {
      //this.listaEntidades.push(entidade);

      if (typeof entidade === "object") {
        const indiceEncontrado = this.listaEntidades.indexOf(entidade);
        this.listaEntidades[indiceEncontrado] = entidade;
      }
    },

    incluirEntidade() {
      if (typeof this.$route.params.entidade === "string") {
        this.entidade = this.$route.params.entidade;
        this.listaEntidades.push(this.entidade);
      }
      //console.log(this.listaEntidades);
    },
*/
};
</script>

<template>
  <!-- CORPO #################################################################################################################-->
  <div>
    <!-- <h1>mensagem: {{ $route.params.mensagem }}</h1> -->
    <!-- Content Header (Page header) -->
    <!-- CABELHO DA PAGINA -->
    <TituloDaPagina msg="Folha de Produtividade" />

    <!-- CONTEUDO PRINCIAPAL PAGINA #################################################################################################################-->
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-10">
            <div class="alert alert-dismissible alert-danger" v-if="isErroResposta">
              Houve erro no carregamento! Por favor tente novamente.
            </div>

            <RouterLink to="/lista/cadastro" class="btn btn-primary float-right d-none d-sm-inline"
              >cadastar</RouterLink
            >

            <input type="text" v-model="buscaEntidade" />
            <button class="btn bt-sm btn-info">Pesquisar</button>

            <div v-if="isLoading" class="text-center clearfix">
              <i class="fa fa-spinner fa-spin fa-4x fa-fw"></i>
            </div>

            <table class="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">FOCO</th>
                  <th scope="col">DATA REALIZAÇÃO</th>
                  <th scope="col">AÇÃO</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(entidade, index) in listaEntidadesFiltrada" :key="index">
                  <th cod="row">
                    {{ entidade.IDFOLHA }}
                  </th>
                  <td>
                    {{ entidade.FOCO }}
                  </td>
                  <td>
                    {{ entidade.DTAREALIZACAO }}
                  </td>

                  <td class="botao-acao">
                    <button
                      class="btn btn-info"
                      title="Editar"
                      v-on:click="direcionaParaEdicao(entidade)"
                    >
                      <i class="fa fa-edit"></i>
                    </button>

                    {{ " " }}

                    <button
                      type="button"
                      class="btn bt-sm btn-danger float-right"
                      data-toggle="modal"
                      data-target="#inativarItemModal"
                      v-on:click="prepararInativarItem(entidade, index)"
                    >
                      <i class="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- MODAL  ------------------------------------------------------------------------ -->
            <ModalExcluirItem
              id="inativarItemModal"
              :entidade="entidade"
              v-on:remove="inativarItemEmitidoPeloModal($event)"
            />
          </div>

          <!-- /.col-md-6 -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </div>
    <!-- /.content -->
  </div>
</template>

<style>
.botao-acao {
  display: flex;
}
/*
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}*/
</style>
