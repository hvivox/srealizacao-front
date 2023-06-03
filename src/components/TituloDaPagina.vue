<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <!-- Content Header (Page header) -->
  <!-- CABELHO DA PAGINA -->
  <div class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1 class="m-0">{{ msg }}</h1>
        </div>
        <!-- /.col -->
        <!-- BRADGRUMP #####################################################################################################-->

        <div class="col-sm-6">
          <ol class="breadcrumb float-sm-right">
            <li class="breadcrumb-item">
              <RouterLink to="/">Home</RouterLink>
            </li>
            <li class="breadcrumb-item active">{{ $route.name }}</li>
          </ol>
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->
    </div>
    <!-- /.container-fluid -->
  </div>
  <!-- /.content-header -->
</template>

<style scoped></style>
