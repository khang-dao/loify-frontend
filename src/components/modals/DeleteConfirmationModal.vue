<script setup lang="ts">
const {
  visible,
  title = 'Confirm Delete',
  message = 'Are you sure you want to delete?',
  onConfirmDelete,
  onCancelDelete
} = defineProps<{ visible: boolean; title?: string; message?: string; onConfirmDelete: () => void, onCancelDelete:() => void }>()

</script>

<template>
  <div class="modal-overlay" v-if="visible">
    <div class="modal">
      <h3 class="modal-title">{{ title }}</h3>
      <p class="modal-message">{{ message }}</p>

      <div class="modal-actions">
        <button class="confirm-button" @click="onConfirmDelete">Delete</button>
        <button class="cancel-button" @click="onCancelDelete">Cancel</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  font-family: 'League Spartan', sans-serif;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
}

.modal-title {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.modal-message {
  margin-bottom: 20px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
}

.confirm-button {
  background-color: #d9534f;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.cancel-button {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.confirm-button:hover {
  background-color: #c9302c;
}

.cancel-button:hover {
  background-color: #5a6268;
}
</style>
