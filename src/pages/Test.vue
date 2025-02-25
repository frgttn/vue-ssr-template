<script setup lang="ts">
import { computed } from 'vue';
import useTestStore from '../store/test';

const store = useTestStore();
const count = computed(() => store.count);
</script>

<template>
	  <p>Count: {{ count }}</p>
  <button @click="store.increment">Increment</button>
  <button @click="store.decrement">Decrement</button>
</template>