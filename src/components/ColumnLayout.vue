<script setup lang="ts">
import FadeTransition from '@/components/transitions/FadeTransition.vue'
import ItemSkeleton from '@/components/skeletons/ItemSkeleton.vue'

const {
  index,
  colName,
  emptyCondition = false,
  skeletonCondition
} = defineProps<{
  index: string
  colName: string
  emptyCondition?: boolean
  skeletonCondition: boolean
}>()
</script>
<template>
  <div class="column">
    <FadeTransition>
      <template v-if="emptyCondition"/>

      <div class="column-content" v-else>
        <header class="header">
          <slot class name="header-icon" />
          <h2 class="title">{{ colName }}</h2>
        </header>
        <div class="item-container">
          <template v-if="skeletonCondition">
            <ItemSkeleton v-for="i in 20" :key="i" />
          </template>
          <template v-else>
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
  overflow: auto;
  padding-top: 3rem;
  background-color: #aeaed0;
  border-radius: 0.5rem;
}

.column-content {
    display: flex;
    flex-direction: column;
    gap: 3rem;
}

/* .column.skeleton {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 3rem;
  padding: 1rem;
  overflow: hidden;
  padding-top: 3rem;
} */

.header {
  display: flex;
}

.header > :first-child{
    flex: 1
}

.header::after {
  content: '';
  flex: 1;
}

.title {
  font-family: 'night-pumpkind', sans-serif;
  color: #000000;
  font-size: 2rem;
  /* transform: translateX(1.7rem);1 */
  white-space: nowrap;
}

.item-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

::-webkit-scrollbar {
  width: 1.7rem;
}

::-webkit-scrollbar-track {
  margin-top: 7.5rem;
  margin-bottom: 1rem;
}

::-webkit-scrollbar-thumb {
  border: solid 0.5rem #aeaed0;
  border-radius: 1rem;
  background-color: #847f95;
}
</style>
