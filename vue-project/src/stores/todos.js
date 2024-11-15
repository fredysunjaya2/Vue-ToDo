import { defineStore } from "pinia";
import { baseAPI } from "@/plugins/axios-api";
import { endpoints } from "@/plugins/endpoints";
import moment from "moment";

export const useTodosStore = defineStore("todos", {
  state: () => ({
    ongoingTask: [],
    doneTask: [],
    sortBySelectValue: "",
  }),

  getters: {},

  actions: {
    getTask() {
      return new Promise((resolve, reject) => {
        baseAPI
          .get(`${endpoints.TASKS}`)
          .then((response) => {
            let tasks = response.data;

            this.ongoingTask = tasks.filter(
              (task) => task.status === "ongoing"
            );
            this.doneTask = tasks.filter((task) => task.status === "done");
            this.sortByTask();
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    sortByTask() {
      if (this.sortBySelectValue === "Date") {
        this.ongoingTask.sort((a, b) => {
          if (moment(a.createdAt).isBefore(moment(b.createdAt))) {
            return -1;
          } else if (moment(a.createdAt).isAfter(moment(b.createdAt))) {
            return 1;
          } else {
            return 0;
          }
        });

        this.doneTask.sort((a, b) => {
          if (moment(a.createdAt).isBefore(moment(b.createdAt))) {
            return -1;
          } else if (moment(a.createdAt).isAfter(moment(b.createdAt))) {
            return 1;
          } else {
            return 0;
          }
        });
      } else if (this.sortBySelectValue === "A-Z") {
        this.ongoingTask.sort((a, b) => {
          if (a.name.localeCompare(b.name, { ignorePunctuation: true }) < 0) {
            return -1;
          } else if (
            a.name.localeCompare(b.name, { ignorePunctuation: true }) > 0
          ) {
            return 1;
          } else {
            return 0;
          }
        });

        this.doneTask.sort((a, b) => {
          if (a.name.localeCompare(b.name, { ignorePunctuation: true }) < 0) {
            return -1;
          } else if (
            a.name.localeCompare(b.name, { ignorePunctuation: true }) > 0
          ) {
            return 1;
          } else {
            return 0;
          }
        });
        // const responseTemp = await axios.get('/api/tasks?_sort=name')
        // tasks = responseTemp.data
      } else if (this.sortBySelectValue === "Z-A") {
        this.ongoingTask.sort((a, b) => {
          if (a.name.localeCompare(b.name, { ignorePunctuation: true }) < 0) {
            return 1;
          } else if (
            a.name.localeCompare(b.name, { ignorePunctuation: true }) > 0
          ) {
            return -1;
          } else {
            return 0;
          }
        });

        this.doneTask.sort((a, b) => {
          if (a.name.localeCompare(b.name, { ignorePunctuation: true }) < 0) {
            return 1;
          } else if (
            a.name.localeCompare(b.name, { ignorePunctuation: true }) > 0
          ) {
            return -1;
          } else {
            return 0;
          }
        });
      }
    },

    addTask(payload) {
      return new Promise((resolve, reject) => {
        baseAPI
          .post(`${endpoints.TASKS}`, payload)
          .then((response) => {
            this.getTask();
            resolve(response);
          })
          .catch((error) => {
            reject(response);
          });
      });
    },

    updateTask(item, payload) {
      return new Promise((resolve, reject) => {
        baseAPI
          .patch(`${endpoints.TASKS}${item.id}`, payload)
          .then((response) => {
            this.getTask();
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    markTask(item, payload) {
      return new Promise((resolve, reject) => {
        baseAPI
          .patch(`${endpoints.TASKS}${item.id}`, payload)
          .then((response) => {
            this.getTask();
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    deleteTask(item) {
      return new Promise((resolve, reject) => {
        baseAPI
          .delete(`${endpoints.TASKS}${item.id}`)
          .then((response) => {
            this.getTask();
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});
