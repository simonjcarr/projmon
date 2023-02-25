<template>
  <div style="max-width: 75%; margin-top: 50px">
    <q-card>
      <q-card-section>
        <div class="text-h6">Create New Action</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            v-model="action.title"
            label="Title"
            filled
            lazy-rules
            :rules="[(val) => val.length > 0 || 'Please type a title']"
          />
          <q-input
            v-model="action.description"
            label="Description"
            filled
            lazy-rules
            :rules="[(val) => val.length > 0 || 'Please type a description']"
          />
          <q-select
            v-model="action.priority"
            label="Priority"
            filled
            :options="['High', 'Medium', 'Low']"
            lazy-rules
            :rules="[(val) => val.length > 0 || 'Please select a priority']"
          />
          <q-select
            v-model="action.status"
            label="Status"
            filled
            :options="['Not Started', 'In Progress', 'Completed']"
            lazy-rules
            :rules="[(val) => val.length > 0 || 'Please select a status']"
          />
          <q-input filled v-model="action.dueDate" mask="##/##/####">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="action.dueDate" mask="DD/MM/YYYY">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <div>
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "NewActionForm",
  data() {
    return {
      action: {
        title: "",
        description: "",
        priority: "Medium",
        status: "Not Started",
        dueDate: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit");
      this.$emit("submit", this.action);
    },
    onReset() {
      this.action.title = "";
      this.action.description = "";
      this.action.priority = "Medium";
      this.action.status = "Not Started";
      this.action.dueDate = "";
    },
  },
};
</script>
