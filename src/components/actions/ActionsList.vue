<template>
  <div>
    <q-card>
      <q-card-section>
        
      </q-card-section>
      <q-card-section>
        <q-table
          title="Actions"
          :columns="columns"
          :rows="rows"
          row-key="id"
          :rows-per-page-options="[2, 5, 10, 15]"
        >
        </q-table>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'ActionsList',
  data() {
    return {
      columns: [
        {
          name: 'title',
          label: 'Title',
          field: 'title',
          align: 'left',
          sortable: true,
        },
        {
          name: 'description',
          label: 'Description',
          field: 'description',
          align: 'left',
          sortable: true,
        },
        {
          name: 'priority',
          label: 'Priority',
          field: 'priority',
          align: 'left',
          sortable: true,
        },
        {
          name: 'status',
          label: 'Status',
          field: 'status',
          align: 'left',
          sortable: true,
        },
        {
          name: 'dueDate',
          label: 'Due Date',
          field: 'dueDate',
          align: 'left',
          sortable: true,
        },],

      rows: [
        {
          id: 1,
          title: 'Action 1',
          description: 'Description 1',
          priority: 'High',
          status: 'In Progress',
          dueDate: '2021-01-01',
        },
        {
          id: 2,
          title: 'Action 2',
          description: 'Description 2',
          priority: 'Medium',
          status: 'Not Started',
          dueDate: '2021-01-02',
        },
        {
          id: 3,
          title: 'Action 3',
          description: 'Description 3',
          priority: 'Low',
          status: 'Completed',
          dueDate: '2021-01-03',
        },
      ],
    }
  },
}
</script>
