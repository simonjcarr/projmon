<template>
  <q-page padding>
    <ActionsList />
  </q-page>
</template>

<script>
import ActionsList from '../components/actions/ActionsList.vue'
export default {
  name: 'ActionsPage',
  components: {
    ActionsList
  },
}
</script>
