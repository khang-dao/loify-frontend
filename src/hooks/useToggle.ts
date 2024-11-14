import { ref } from 'vue';

export function useToggle(initialState = false) {
  const state = ref(initialState);
  const toggle = () => (state.value = !state.value);
  return { state, toggle };
}