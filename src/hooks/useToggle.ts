import { ref } from 'vue'

/**
 * A composable function to manage a toggleable boolean state.
 * @param {boolean} [initialState=false] - The initial state of the toggle.
 * @returns {object} - An object containing the state and toggle methods.
 */
export function useToggle(initialState: boolean = false) {
  const isToggled = ref<boolean>(initialState)

  const toggle = () => (isToggled.value = !isToggled.value)
  const toggleOn = () => (isToggled.value = true)
  const toggleOff = () => (isToggled.value = false)
  const setState = (value: boolean) => (isToggled.value = value)

  return { isToggled, toggle, toggleOn, toggleOff, setState }
}
