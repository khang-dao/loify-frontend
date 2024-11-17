<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import ItemSkeleton from '@/components/skeletons/ItemSkeleton.vue'
import FadeTransition from '@/components/transitions/FadeTransition.vue'

const {
  colName,
  emptyCondition = false,
  skeletonCondition,
  displayCondition = false
} = defineProps<{
  colName: string
  emptyCondition?: boolean
  skeletonCondition: boolean
  displayCondition: any
}>()
</script>
<template>
  <div :class="['column', { skeleton: skeletonCondition }]">
    <FadeTransition>
      <template v-if="emptyCondition" />

      <div :class="['column-content', { skeleton: skeletonCondition }]" v-else>
        <header class="header">
          <div>
            <slot name="header-icon"></slot>
          </div>
          <h2 class="title">{{ colName }}</h2>
          <div>
            <slot name="header-icon-2"></slot>
          </div>
        </header>
        <slot name="extra" />

        <div :class="['item-container', { skeleton: skeletonCondition }]">
          <template v-if="skeletonCondition">
            <ItemSkeleton v-for="i in 20" :key="i" />
          </template>

          <template v-else-if="displayCondition">
            <slot name="main-content" />
          </template>
        </div>
      </div>
    </FadeTransition>
  </div>
</template>

<style scoped>
.column {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 3rem;
  padding: 1.5rem;
  padding-top: 3rem;
  background-color: #aeaed0;
  border-radius: 0.5rem;
}

.item-container.skeleton {
  overflow: hidden;
}

.column-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.header {
  display: flex;
  position: sticky; /* Make the header sticky */
  top: 0; /* Position it at the top */
  background-color: #aeaed0; /* Ensure it has a background color */
  z-index: 10; /* Bring it above other content */
  padding: 0.5rem; /* Optional: Add some padding */
  align-items: center;
}

.item-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto; /* Allow scrolling inside the item container */
  max-height: calc(100vh - 14.5rem); /* Set a maximum height for the item container */
  padding-right: 1.5rem; /* Optional: Add padding for aesthetics */
}

.header > :first-child {
  display: flex;
  flex: 1;
}

.header > :last-child {
  flex: 1;
  justify-content: flex-end;
  display: flex;
}

.header > :last-child > svg {
  justify-content: flex-end;
}

.title {
  font-family: 'night-pumpkind', sans-serif;
  color: #000000;
  font-size: 2rem;
  /* transform: translateX(1.7rem); include this to move the `title` left/right */
  white-space: nowrap;
}

::-webkit-scrollbar {
  width: 0.7rem;
}

::-webkit-scrollbar-thumb {
  border-radius: 1rem;
  background-color: #847f95;
}
</style>
