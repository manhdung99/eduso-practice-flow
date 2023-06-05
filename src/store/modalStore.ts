import { defineStore } from "pinia";

export const useModalStore = defineStore("modalStore", {
  state: () => ({
    openTheoryModal: false,
  }),
  actions: {
    updateTheoryModalStatus(status) {
      this.openTheoryModal = status;
    },
  },
});
