<template>
  <div :class="{ small }" class="o-logo">
    <img class="o-logo__image" src="~/assets/images/patient.svg">
    <p class="o-logo__text">
      Sistema Unificado Nacional de Dados de Oncologia Infanto Juvenil
    </p>
  </div>
</template>

<script>
export default {
  props: {
    small: {
      type: Boolean
    }
  }
};
</script>

Sistema que através da integralidade nacional, praticidade de preenchimento e aprendizado continuo revolucionam o cenário da onco pediatria.
