<template>
  <div>
    <q-card>
      <q-card-section>
        <!-- Button to open the new action modal form -->
        <q-btn
          label="New Action"
          color="primary"
          @click="showNewActionForm = true"
          dense
          size="md"
        />
      </q-card-section>
      <q-card-section>
        <q-table
          title="Actions"
          :columns="columns"
          :rows="rows"
          row-key="id"
          :rows-per-page-options="[5, 10, 15]"
          selection="multiple"
          v-model:selected="selected"
          dense
          :filter="filter"
        >
          <template v-slot:top-left>
            <div class="flex">
              <div style="width: 200px; margin-right: 5px">
                <!-- Select box that contains Not Started, Completed, In Progress, spacer and Delete -->
                <q-select
                  v-if="selected.length > 0"
                  label="With Selected"
                  v-model="selectedStatus"
                  filled
                  dense
                  :options="[
                    {
                      group: 'Status',
                      label: 'Status',
                      disable: true
                    },
                    {
                      label: 'Not Started',
                      value: 'Not Started',
                      icon: 'stop'
                    },
                    {
                      label: 'In Progress',
                      value: 'In Progress',
                      icon: 'play_arrow'
                    },
                    {
                      label: 'Completed',
                      value: 'Completed',
                      icon: 'done'
                    },
                   ]"
                  @update:model-value="onStatusChange"
                >
                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps">
                      <q-item-section avatar>
                        <q-icon :name="scope.opt.icon" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{ scope.opt.label }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
              <div>
                <q-btn v-if="selected.length > 0" color="negative" icon="delete" label="Delete" @click="onDelete" size="md" />
              </div>
            </div>
          </template>
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th auto-width />
              <q-th auto-width />
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
              >
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td auto-width>
                <q-checkbox dense v-model="props.selected" />
              </q-td>
              <q-td auto-width>
                <q-btn :title="getRowIconTitle(props)" size="xs" :color=getRowIconColor(props) round dense  :icon=getRowIcon(props) />
              </q-td>
              <q-td
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
                :class="rowColor(props, col.name)"
              >
                {{ col.value }}
              </q-td>
            </q-tr>
          </template>

        </q-table>
      </q-card-section>
    </q-card>
  </div>
  <!-- Modal for new action form with a 50% width -->
  <q-dialog v-model="showNewActionForm" maximized>
    <NewActionForm @submit="newActionSubmit" />
  </q-dialog>
</template>

<script>
import NewActionForm from './NewActionForm.vue'


export default {
  name: 'ActionsList',
  data() {
    return {
      showNewActionForm: false,
      selectedStatus: '',
      selected: [],
      filter: "",
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
          sort: (a, b) => this.dateSort(a, b)
        },],

      rows: [
        {
          id: 1,
          title: 'Action 1',
          description: 'Description 1',
          priority: 'High',
          status: 'In Progress',
          dueDate: '27/02/2023',
        },
        {
          id: 4,
          title: 'Action 4',
          description: 'Description 4',
          priority: 'High',
          status: 'In Progress',
          dueDate: '02/03/2023',
        },
        {
          id: 2,
          title: 'Action 2',
          description: 'Description 2',
          priority: 'Medium',
          status: 'Not Started',
          dueDate: '24/02/2023',
        },
        {
          id: 3,
          title: 'Action 3',
          description: 'Description 3',
          priority: 'Low',
          status: 'Completed',
          dueDate: '13/02/2023',
        },
        {
          id: 5,
          title: 'Action 5',
          description: 'Description 5',
          priority: 'Low',
          status: 'Not Started',
          dueDate: '03/04/2023',
        },
      ],
    }
  },
  components: {
    NewActionForm
  },
  methods: {
    onStatusChange(status) {

      this.selected.map(selectedRow => {
        this.rows.map(rowsRow => {
          if(rowsRow.id == selectedRow.id) {
            rowsRow.status = status.value
          }
        })
      })
      this.selected = []
    },
    onDelete() {
      this.selected.map(selectedRow => {
        this.rows.map((rowsRow,index) => {
          if(rowsRow.id == selectedRow.id) {
            this.rows.splice(index,1)
          }
        })
      })
      this.selected = []
    },
    newActionSubmit(action) {
      this.showNewActionForm = false
      this.rows.push(action)
    },
    dateSort(a, b) {
      {
        const datePartsA = a.split('/')
        const datePartsB = b.split('/')
        const dateA = new Date(datePartsA[2], datePartsA[1] - 1, datePartsA[0])
        const dateB = new Date(datePartsB[2], datePartsB[1] - 1, datePartsB[0])
        let result = dateA - dateB
        return result
      }
    },
    rowColor(props, colName) {
      if (colName === 'status') {
        if (props.row.status === 'Completed') {
          return 'bg-green text-white'
        }
        if (props.row.status === 'In Progress') {
          return 'bg-blue text-white'
        }
        const dueDateSplit = props.row.dueDate.split('/')
        const dueDate = new Date(dueDateSplit[2], dueDateSplit[1] - 1, dueDateSplit[0])
        const today = new Date()
        if (dueDate < today) {
          return 'bg-red text-white'
        }
        if (dueDate == today) {
          return 'bg-orange text-white'
        }
      }
    },
    getRowIcon(props) {
      if (props.row.status === 'Completed') {
        return 'check'
      }
      if (props.row.status === 'In Progress') {
        return 'play_arrow'
      }
      return 'pause'
    },
    getRowIconColor(props) {
      if (props.row.status === 'Completed') {
        return 'green'
      }
      if (props.row.status === 'In Progress') {
        return 'blue'
      }
      return 'orange'
    },
    getRowIconTitle(props) {
      if (props.row.status === 'Completed') {
        return 'Completed'
      }
      if (props.row.status === 'In Progress') {
        return 'In Progress'
      }
      return 'Not Started'
    },

  }
}
</script>
