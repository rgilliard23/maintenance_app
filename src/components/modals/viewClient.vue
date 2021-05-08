<template>
  <div class="scroll">
    <Sidebar
      v-bind:visible="visible"
      :baseZIndex="5"
      position="full"
      v-on:update:visible="$emit('closeViewClient', $event)"
    >
      <h2 class="center">Client Information</h2>
      <div class="p-grid">
        <div class="p-col">
          <div class="p-d-flex p-flex-column p-ai-center">
            <Avatar icon="pi pi-user" size="xlarge" />
            <h2 class="p-my-4">
              {{ client.firstName + " " + client.lastName }}
            </h2>
            <div class="p-mb-4">
              <Chip :label="client.selectedMaintenancePlan.name" />
            </div>
            <div class="p-d-flex p-flex-md-row">
              <Button
                label="Send Email"
                @click="viewSendEmail"
                class="p-button-raised p-button-rounded p-mr-2"
              />
              <Button
                label="Send Report "
                @click="viewSendReport"
                class="p-button-raised p-button-rounded p-ml-2"
              />
            </div>
          </div>
        </div>
        <div class="p-col">
          <div class="p-d-flex p-flex-row p-ai-center p-mr-2">
            <h4>Open Tasks: {{ client.openTasks + count }}</h4>
            <Button
              label="Create Task"
              @click="showCreateTask"
              class="p-button-raised p-button-rounded p-mx-4 p-my-4"
            />
            <Button
              label="View All Tasks"
              @click="showViewTasks"
              class="p-button-raised p-button-rounded p-mx-4 p-my-4"
            />
          </div>
          <hr />
          <h4>Personal Info</h4>
          <div class="p-d-flex p-flex-row p-jc-start">
            <h4>Email: {{ client.email }}</h4>
            <h4 class="p-ml-4">Phone Number: {{ client.phoneNumber }}</h4>
          </div>
        </div>
      </div>

      <hr />
      <h4>Tasks</h4>
      <div class="calendar">
        <FullCalendar :events="events" :options="options" />
      </div>

      <ViewAllTasks
        :visible="viewTasks"
        :tasks="tasks"
        v-on:closeViewTasks="closeViewTasks"
      />
      <ViewTask
        v-on:close="closeViewTask"
        :visible="viewTask"
        :task="taskModel"
      />
      <create-task
        :visible="createTask"
        :client="client"
        v-on:close="closeCreateTask"
        v-on:createTask="increaseCount"
      />
      <SendEmail :visible="viewEmail" v-on:close="closeSendEmail" />
      <SendReport :visible="viewReport" v-on:close="closeSendReport" />
    </Sidebar>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { onMounted } from "@vue/runtime-core";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import { useStore } from "vuex";
import moment from "moment";

//* Components
import CreateTask from "../modals/createTask";
import ViewAllTasks from "../modals/viewAllTasks";
import ViewTask from "../modals/viewTask";
import SendReport from "../modals/sendReport";
import SendEmail from "../modals/sendEmail";

export default {
  components: {
    CreateTask,
    ViewAllTasks,
    ViewTask,
    SendReport,
    SendEmail,
  },
  props: {
    visible: {
      required: true,
    },
    client: {
      required: true,
    },
  },
  setup() {
    let store = useStore();
    let createTask = ref(false);
    let tasksLoading = ref(true);
    let viewTask = ref(false);
    let taskModel = ref({});
    let viewTasks = ref(false);
    let tasks = ref([]);
    let events = ref([]);
    let viewReport = ref(false);
    let viewEmail = ref(false);
    let count = ref(0);

    const options = ref({
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialDate: Date.now(),
      headerToolbar: {
        left: "prev,next",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      },
      editable: true,
      eventClick: (e) => {
        taskModel.value = e.event.extendedProps.task;
        viewTask.value = true;
      },
    });

    onMounted(async () => {
      await store.dispatch("getTasks");
      tasks.value = store.getters.tasks;
      console.log(tasks.value);
      tasksLoading.value = false;
      events.value = tasks.value.map((task) => {
        return {
          title: task.header,
          start: moment
            .utc(new Date(task.dateCreated.seconds * 1000))
            .valueOf(),
          end: moment.utc(new Date(task.dateDue.seconds * 1000)).valueOf(),
          extendedProps: {
            task: task,
          },
        };
      });
    });

    const increaseCount = () => {
      count.value++;
    };

    const showCreateTask = () => {
      createTask.value = true;
    };

    const closeCreateTask = () => {
      createTask.value = false;
    };

    const showViewTasks = () => {
      viewTasks.value = true;
    };

    const closeViewTasks = () => {
      viewTasks.value = false;
    };
    const closeViewTask = () => {
      viewTask.value = false;
    };

    const viewSendReport = () => {
      viewReport.value = true;
    };

    const closeSendReport = () => {
      viewReport.value = false;
    };

    const viewSendEmail = () => {
      viewEmail.value = true;
    };

    const closeSendEmail = () => {
      viewEmail.value = false;
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
      createTask,
      showCreateTask,
      closeCreateTask,
      showViewTasks,
      closeViewTasks,
      tasks,
      taskFilter,
      clearFilter,
      tasksLoading,
      viewTasks,
      events,
      options,
      taskModel,
      viewTask,
      closeViewTask,
      closeSendReport,
      viewSendReport,
      viewReport,
      viewSendEmail,
      closeSendEmail,
      viewEmail,
      count,
      increaseCount,
    };
  },
};
</script>

<style scoped>
@media screen and (max-width: 960px) {
  ::v-deep(.fc-header-toolbar) {
    display: flex;
    flex-wrap: wrap;
  }
}
.calendar {
  overflow-y: scroll;
  height: 60vh;
  padding: 0 15vw;
}
</style>
