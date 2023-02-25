<template>
  <q-page padding>
    <ActionsList @row-click="onRowClick"/>
  </q-page>
</template>

<script>
import ActionsList from '../components/actions/ActionsList.vue'
export default {
  name: 'ActionsPage',
  components: {
    ActionsList
  },
  methods: {
    onRowClick(row) {
      console.log(row.id)
    }
  }
}
</script>
