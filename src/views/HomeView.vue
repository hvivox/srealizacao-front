<script setup>
import Dashboard from "@/components/Dashboard.vue";
import TituloDaPagina from "../components/TituloDaPagina.vue";
</script>

<template>
  <!-- CABELHO DA PAGINA -->
  <TituloDaPagina msg="Folha de Produtividade" />

  <!-- CONTEUDO PRINCIAPAL PAGINA #################################################################################################################-->
  <div class="content ml-3">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-10">
          <Dashboard />

          <!-- /.col-md-6 -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </div>
    <!-- /.content -->
  </div>
</template>
