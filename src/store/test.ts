import { defineStore } from "pinia";

export interface TestState {
  count: number;
}

const useTestStore = defineStore("test", {
  state: (): TestState => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
  },
});

export default useTestStore;
