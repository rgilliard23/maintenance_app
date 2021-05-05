<template>
  <div>
    <DataTable
      :value="tasks"
      v-model:filters="taskFilter"
      responsiveLayout="scroll"
      filterDisplay="menu"
      ><template #header>
        <div class="p-d-flex p-jc-between">
          <Button
            type="button"
            icon="pi pi-filter-slash"
            label="Clear"
            class="p-button-outlined"
            @click="clearFilter()"
          />
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              v-model="taskFilter['global'].value"
              placeholder="Keyword Search"
            />
          </span>
        </div>
      </template>
      <Column field="header" sortable header="Task Name">
        <template #body="{ data }">
          {{ data.header }}
        </template>
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            placeholder="Search by Task Name"
          />
        </template>
      </Column>
      <Column field="header" sortable header="Due Date">
        <template #body="{ data }">
          {{
            moment(new Date(data.dateDue.seconds * 1000)).format("MMMM d, yyyy")
          }}
        </template>
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            placeholder="Search by Date Due"
          />
        </template>
      </Column>
      <Column field="header" sortable header="Status">
        <template #body="{ data }">
          <Button type="button" :label="data.status" class="p-button-info" />
        </template>
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            placeholder="Search by Status"
          />
        </template>
      </Column>
      <Column :exportable="false">
        <template #body="slotProps">
          <Button
            icon="pi pi-eye"
            class="p-button-rounded p-button-success p-mr-2"
            @click="showTask(slotProps.data)"
          />
          <Button
            icon="pi pi-trash"
            class="p-button-rounded p-button-warning"
            @click="deleteTask(slotProps.data)"
          />
        </template>
      </Column>
      <template #empty> No Tasks Found. </template>
    </DataTable>
    <ViewTask :visible="viewTask" :task="task" v-on:close="closeViewTask" />
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import moment from "moment";

//* components
import ViewTask from "../modals/viewTask";

export default {
  components: { ViewTask },
  props: {
    tasks: {
      required: true,
    },
  },

  setup() {
    let tasksLoading = ref(true);
    let task = ref();
    let viewTask = ref(false);
    const showTask = (data) => {
      task.value = data;
      viewTask.value = true;
    };

    const closeViewTask = () => {
      viewTask.value = false;
    };
    const taskFilter = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      header: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      description: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      dateDue: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
      },
      status: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
    });

    const clearFilter = () => {
      taskFilter.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        header: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        description: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        dateDue: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
        },
        status: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
      };
    };

    return {
      tasksLoading,
      taskFilter,
      clearFilter,
      moment,
      showTask,
      task,
      viewTask,
      closeViewTask,
    };
  },
};
</script>
