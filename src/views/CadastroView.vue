<script setup>
import TodoList from "@/components/TodoList.vue";
import TituloDaPagina from "../components/TituloDaPagina.vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength, between } from "@vuelidate/validators";
import axios from "axios";
</script>

<script>
export default {
  data() {
    return {
      //$autoDirty: detecta se o campo foi moficado
      v$: useVuelidate({ $autoDirty: true }),
      entidade: {
        FOCO: "",
        NOTADIA: "",
        DTAREALIZACAO: "",
        OBSERVACAO: "",
      },
      idEnviado: this.$route.params.id,
      isLoading: false,
      errorMsg: "",
      errorListaValidacaoLaravel: "",
    };
  },
  mounted() {
    this.preparaTelaParaCadastroOuEdicao();
  },
  computed: {
    isTemAlgumCampoInvalidoNoFormulario() {
      return this.v$.$invalid;
    },
  },

  methods: {
    preparaTelaParaCadastroOuEdicao() {
      // PREPARA A TELA PARA EDIÇÃO OU PREPARA PARA UM NOVO CADASTRO
      // NOVO
      this.isLoading = true;
      if (this.idEnviado == "" || typeof this.idEnviado == "undefined") {
        this.entidade = {
          FOCO: "",
          NOTADIA: "",
          DTAREALIZACAO: "",
          OBSERVACAO: "",
          prioridades: [],
          restricoes: [],
          aprendizagens: [],
          gratidoes: [],
        };
        this.isLoading = false;
      }
      // EDITAR
      else {
        let url = "/api/folha/" + this.idEnviado;

        axios
          .get(url)
          .then((response) => {
            this.entidade = response.data;
          })
          .catch((errors) => {
            this.mensagem = errors.response.data.mensagem;
            this.isHouveErro = true;
            this.isLoading = false;
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
      //this.isLoading = false;
    },
    //METODO É ATULIZADO APOS A COMUNICAÇÃO COM O COMPONENTE TODO
    atualizarListaPrioridades($event) {
      let listaEntidades = $event;
      this.entidade.prioridades = listaEntidades;
    },
    atualizarListaRestricoes($event) {
      let listaEntidades = $event;
      this.entidade.restricoes = listaEntidades;
    },
    atualizarListaAprendizagens($event) {
      let listaEntidades = $event;
      this.entidade.aprendizagens = listaEntidades;
    },
    atualizarListaGratidoes($event) {
      let listaEntidades = $event;
      this.entidade.gratidoes = listaEntidades;
    },

    salvarOuAtualizar() {
      if (this.$route.params.id == "" || typeof this.$route.params.id == "undefined") {
        this.salvar();
      } else {
        this.atualizar();
      }
    },
    salvar() {
      let url = "/api/folha";
      this.isLoading = true;

      axios
        .post(url, this.entidade)
        .then((response) => {
          //console.log(response);
          this.$router.push({ name: "lista" });
          this.$notify({
            group: "notificacaolista",
            text: "Operação realizada com sucesso!",
            type: "success",
            position: "top center",
          });
        })
        .catch((errors) => {
          if (errors.response.status == 422) {
            this.errorListaValidacaoLaravel = errors.response.data;
          }
          //VALIDAR MENSAGEM DE ERRO 500
          this.mensagem = errors.response.data.mensagem;
          this.isHouveErro = true;
          this.isLoading = false;
        })
        .finally(() => {
          this.loading = false;
          this.isBotaoEntrarInativo = false;
          if (this.msgSucesso) {
            this.isBotaoEntrarInativo = true;
          }
        });
    },
    atualizar() {
      this.isLoading = true;

      this.v$.$validate();
      if (!this.v$.$error) {
        let url = "/api/folha/" + this.entidade.IDFOLHA;

        axios
          .put(url, this.entidade)
          .then((response) => {
            this.entidade = response.data;

            this.$router.push({ name: "lista" });

            this.$notify({
              group: "notificacaolista",
              text: "Operação realizada com sucesso!",
              type: "success",
              position: "top center",
            });
          })
          .catch((errors) => {
            if (errors.response.status == 422) {
              this.errorListaValidacaoLaravel = errors.response.data;
            }
            //VALIDAR MENSAGEM DE ERRO 500
            this.mensagem = errors.response.data.mensagem;
            this.isHouveErro = true;
            this.isLoading = false;
          })
          .finally(() => {
            this.isLoading = false;
          });

        //FALHA NA VALIDAÇÃO DO VUELIDATE
      } else {
        alert("FORMULÁRIO NÃO ESTÁ PREENCHIDO CORRETAMENTE, POR FAVOR VERIFIQUE OS CAMPOS.");
      }
      //this.v$.$touch();
    },
  },

  /* submit() {
    console.log("submit");
    //faz a validação do formulário
    this.v$.$touch();
  },
*/
  validations() {
    return {
      entidade: {
        FOCO: { required },
        DTAREALIZACAO: { required },
      },
    };
  },
};
</script>
<template>
  <!-- <h1>valor recebido: {{ $route.params.id }}</h1> -->
  <!-- Content Header (Page header) -->
  <!-- CABELHO DA PAGINA -->
  <TituloDaPagina msg=" Cadastro Folha" />

  <!-- CONTEUDO PRINCIAPAL PAGINA #################################################################################################################-->
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-10">
          <!-- <div v-if="isLoading">CARREGANDO...</div> -->
          <!-- <div v-if="isErroResposta">HOUVE ERRO NO CARREGAMENTO! Tente novamente</div> -->
          <!-- <h1>{{ idEnviado }} sdfsdfsdfsd</h1>
          <h1>valor recebido: {{ $route.params.id }}</h1> -->

          <div v-if="errorListaValidacaoLaravel" class="alert alert-danger" role="alert">
            <p v-for="itemErroValidacao in errorListaValidacaoLaravel" :key="itemErroValidacao">
              {{ itemErroValidacao }}
            </p>
          </div>
          <!-- @submit.stop.prevent="salvarAtualizar()" -->
          <form action="">
            <div class="form-group">
              <div v-if="isLoading" class="text-center clearfix">
                <i class="fa fa-spinner fa-spin fa-4x fa-fw"></i>
              </div>

              <!-- row cabeçalho ----------------------------------------------  -->
              <div class="row mb-3">
                <div class="col-sm-9">
                  <label for="nome">Foco Dia</label>
                  <span v-if="v$.entidade.FOCO.$invalid" style="color: red"> *Obrigatório</span
                  ><br />
                  <input
                    v-model="entidade.FOCO"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': v$.entidade.FOCO.$error }"
                    id="foco"
                    placeholder="Foco do dia"
                  />
                </div>

                <div class="form-group col-xs-4 col-sm-3 pull-right">
                  <label for="dataRealizacao" class="control-label">Data Criação</label>
                  <span v-if="v$.entidade.DTAREALIZACAO.$invalid" style="color: red">
                    *Obrigatório</span
                  ><br />
                  <input
                    id="dataRealizacao"
                    type="date"
                    name="dataRealizacao"
                    class="form-control"
                    :class="{ 'is-invalid': v$.entidade.DTAREALIZACAO.$error }"
                    v-model="entidade.DTAREALIZACAO"
                    required="required"
                  />
                </div>
              </div>

              <!-- fim row cabeçalho ----------------------------------------------  -->

              <div class="row">
                <!-- colunaPrioridadeRestricao------------------------------------  -->
                <div class="col-sm-6 colunaPrioridadeRestricao">
                  <TodoList
                    titulo="Lista de prioridades"
                    placeholdertodo="Prioridades"
                    :listaitemprops="entidade.prioridades"
                    v-on:emitirListaItem="atualizarListaPrioridades($event)"
                  ></TodoList>

                  <TodoList
                    titulo="Lista de restrições"
                    placeholdertodo="Restrições"
                    :listaitemprops="entidade.restricoes"
                    v-on:emitirListaItem="atualizarListaRestricoes($event)"
                  ></TodoList>
                </div>
                <!--  fim colunaPrioridadeRestricao------------------------------------  -->

                <!--  ccolunaAprendizagemGratidao------------------------------------      -->
                <div class="col-sm-6 colunaAprendizagemGratidao">
                  <TodoList
                    titulo="Lista de Aprendizagens"
                    placeholdertodo="Aprendizagens"
                    :listaitemprops="entidade.aprendizagens"
                    v-on:emitirListaItem="atualizarListaAprendizagens($event)"
                  ></TodoList>

                  <TodoList
                    titulo="Lista de Gratidões"
                    placeholdertodo="Gratidões"
                    :listaitemprops="entidade.gratidoes"
                    v-on:emitirListaItem="atualizarListaGratidoes($event)"
                  ></TodoList>
                </div>
                <!--  fim ccolunaAprendizagemGratidao------------------------------------      -->
              </div>
            </div>

            <div class="row">
              <div class="form-group col-xs-4 col-sm-12">
                <label for="nota_dia">Nota Dia: {{ entidade.NOTADIA }}/10</label>
                <br />
                <input
                  id="nota_dia"
                  name="nota_dia"
                  class="form-control custom-range"
                  v-model="entidade.NOTADIA"
                  type="range"
                  min="0"
                  max="10"
                  ng-maxlength="2"
                  required
                />
              </div>

              <div class="col-sm-12">
                <label for="observacao">Observação: </label>
                <textarea
                  rows="4"
                  maxlength="250"
                  v-model="entidade.OBSERVACAO"
                  type="text"
                  class="form-control"
                  id="observação"
                  placeholder="Descreve as observações sobre seu dia"
                >
                </textarea>
              </div>
            </div>
            <div class="card-footer">
              <!-- v-on:click.stop.prevent="salvarAtualizar()" -->
              <button
                type="button"
                class="btn btn-primary"
                v-bind:disabled="isTemAlgumCampoInvalidoNoFormulario || isLoading"
                v-on:click.stop.prevent="salvarOuAtualizar()"
              >
                Salvar
                <i v-if="isLoading" class="fa fa-spinner fa-spin fa-fw"></i>
              </button>
              <RouterLink to="/lista" class="btn btn-default float-right">Voltar</RouterLink>
              <!-- <button type="submit" class="btn btn-default float-right">Voltar</button> -->
            </div>

            <!-- <pre> {{ entidade }} </pre> -->
            <!--{{ status }}
            <pre>{{ v$.entidade.FOCO }}</pre>
            -->
            <!-- <button v-on:click="enviarDados" type="button" class="btn btn-secondary">Enviar</button> -->
          </form>

          <!-- /.col-md-6 -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </div>
    <!-- /.content -->
  </div>
</template>

<style></style>
