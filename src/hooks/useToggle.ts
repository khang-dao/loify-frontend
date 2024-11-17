import { ref } from 'vue'

export function useToggle(initialState = false) {
  const state = ref(initialState)
  const toggle = () => (state.value = !state.value)
  const toggleOn = () => (state.value = true)
  const toggleOff = () => (state.value = false)
  return { state, toggle, toggleOn, toggleOff }
}
