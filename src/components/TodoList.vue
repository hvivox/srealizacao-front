<script setup></script>

<script>
export default {
  props: ["titulo", "placeholdertodo", "listaitemprops"],
  data() {
    return {
      listaItens: [],
      item: {
        DESCRICAO: "",
        ISCONCLUIDO: false,
        ORDEM: "",
      },
    };
  },

  updated() {
    this.listaItens = this.listaitemprops;
  },

  methods: {
    inserirItemTodo() {
      this.item.ISCONCLUIDO = false;
      //alert("evento de botão");
      if (this.item.DESCRICAO) {
        this.listaItens.push(this.item);
        this.$emit("emitirListaItem", this.listaItens);
        this.item = {};
        // this.listaItens.reverse();
      }
    },
    removerItem(item) {
      this.listaItens.splice(this.listaItens.indexOf(item), 1);
      //this.listaItens.splice(indice, 1);
    },
  },
};
</script>

<template>
  <!-- PRIORIDADES | TODO LIST --------------------------------------------------------------  -->
  <div class="form-group">
    <label for="prioridade">{{ titulo }}</label>

    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control"
        :name="placeholdertodo"
        v-model="item.DESCRICAO"
        :placeholder="placeholdertodo"
        v-on:keyup.enter="inserirItemTodo()"
      />

      <div class="input-group-append">
        <button
          type="button"
          v-bind:disabled="!item.DESCRICAO"
          v-on:focus="!item.DESCRICAO"
          v-on:click.stop.prevent="inserirItemTodo()"
        >
          Adicionar
        </button>
      </div>
    </div>

    <ul class="list-group grid">
      <span style="color: orange">
        {{ listaItens?.length < 7 ? "" : "* Recomendável descrever até 7 itens" }}</span
      >

      <li class="list-group-item" v-for="(item, key) in listaItens?.slice()?.reverse()" :key="key">
        <input
          type="checkbox"
          class="form-check-input me-2"
          true-value="1"
          false-value="0"
          v-model="item.ISCONCLUIDO"
        />
        <span hidden> {{ (item.ORDEM = key) }} </span>

        <span v-if="item.ISCONCLUIDO == 1">
          <s>{{ item.DESCRICAO }}</s>
        </span>

        <span v-else>
          {{ item.DESCRICAO }}
        </span>
        <button
          type="button"
          class="btn btn-danger float-right ml-3"
          v-on:click="removerItem(item)"
        >
          <i class="fa fa-trash"></i>
        </button>
      </li>
    </ul>
  </div>
  <!-- fim - PRIORIDADESform -->
</template>

<style scoped>
/*LIST GROUP - CONFIGURAÇÃO DO STYLO*/
.list-group {
  height: 220px;
  background: #f5f5f5;
  max-height: 300px;
  margin-bottom: 10px;
  overflow-y: scroll;
  border: 1px solid black;
  -webkit-overflow-scrolling: touch;
}
</style>
