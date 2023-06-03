import { defineStore } from "pinia";
import Unit from "@/types/unit";

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
