<script setup lang="ts">
import FadeTransition from '@/components/transitions/FadeTransition.vue'
import ItemSkeleton from '@/components/skeletons/ItemSkeleton.vue'

const { index, colName, emptyCondition=false, skeletonCondition } = defineProps<{
  index: string
  colName: string
  emptyCondition?: boolean
  skeletonCondition: boolean
}>()
</script>
<template>
    <div :class="['column', `col-${index}`, { 'skeleton': skeletonCondition }]">
        <FadeTransition>
            <template v-if="emptyCondition" />
            
            <div v-else>
              <div class="heading-container">
                <slot name="header-icon" />
                <h2 class="heading">{{ colName }}</h2>
              </div>
              <div class="outer">
                <template v-if="skeletonCondition">
                  <ItemSkeleton v-for="i in 20" :key="i" />
                </template>
                <template v-else>
                  <slot name="main-content"/>
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
  padding: 1rem;
  overflow: auto;
  padding-top: 3rem;
  background-color: #AEAED0;
  border-radius: 0.5rem;
}

.column.skeleton {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 3rem;
  padding: 1rem;
  overflow: hidden;
  padding-top: 3rem;
}

.heading {
  font-family: 'night-pumpkind', sans-serif;
  color: #000000;
  font-size: 2rem;

  position: absolute;
  left:50%;
  transform: translateX(-50%);

  white-space: nowrap;
}

.outer {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.column::-webkit-scrollbar {
  width: 1.7rem;
}

.column::-webkit-scrollbar-track {
  margin-top: 5rem;
  margin-bottom: 1rem;

}

.column::-webkit-scrollbar-thumb {
  background-color: #847F95;
  border-radius: 1rem;
  box-shadow: inset 0 0 10px 10px #847F95;
  border: solid 0.5rem #AEAED0;
}


</style>