<script>
export default {
  emits: ["remove"],
  props: ["id", "entidade"],

  methods: {
    removeItem(entidade) {
      //console.log("remover - modal");
      this.$emit("remove", entidade);
    },
  },
};
</script>

<template>
  <!-- Modal -->
  <div
    class="modal fade"
    :id="id"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">ATENÇÃO!</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <h5>Tem certeza que deseja inativar o item?</h5>
          <p>Titulo: {{ entidade.FOCO }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Não</button>
          <button
            type="button"
            class="btn btn-primary"
            data-dismiss="modal"
            v-on:click="removeItem(entidade)"
          >
            Sim
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
