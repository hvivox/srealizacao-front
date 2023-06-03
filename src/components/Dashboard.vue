<script setup>
import DashboardItem from './DashboardItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'

</script>

<template>
  <DashboardItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Saúde</template>

    Todos os projetos de saúde do Sesc
    <a target="_blank" href="https://www.sesc-am.com.br/saude">link saude</a>
    começe por arqui.
  </DashboardItem>


  <DashboardItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Educação</template>
    Projetos de Eduçação do Sesc
    <a href="https://www.sesc-am.com.br/educacao" target="_blank">link educacionala</a>. Todos os projetos relacioandos +
   
  </DashboardItem>



  <DashboardItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Laser</template>
    Projetos relacionados ao lazer
   
  </DashboardItem>


</template>
