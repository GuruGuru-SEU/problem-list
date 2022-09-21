<script setup>
  import { filter } from './filter'
  import {
    NSpace,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NCard,
    NButtonGroup,
    NButton,
    NIcon,
  } from 'naive-ui'
  import { AddOutline } from '@vicons/ionicons5'
  import ProblemCard from './components/ProblemCard.vue'
  import store from './store'

  function handleSortByDate() {
    store.sortByDate()
  }

  function handleSortByNo() {
    store.sortByNo()
  }

  function handleAddProblem() {
    store.addProblem()
  }
</script>

<template>
  <n-space vertical size="large">
    <n-layout>
      <n-layout-content content-style="padding: 30px;">
        <n-space
          vertical
          size="medium"
          style="
            max-width: 1050px;
            margin-left: auto;
            margin-right: auto;
            min-height: 100vh;
            gap: 0;
          "
        >
          <n-card>
            <n-space vertical justify="space-around">
              <div
                style="font-size: 1.5em; margin-bottom: 10px; font-weight: bold"
              >
                GuruGuru Problem List
              </div>
              <n-space justify="space-between">
                <n-space>
                  <n-button-group>
                    <n-button
                      :type="
                        store.filter.value === filter.all
                          ? 'primary'
                          : 'default'
                      "
                      @click="
                        () => {
                          store.filter.value = filter.all
                        }
                      "
                      >Show All</n-button
                    >
                    <n-button
                      :type="
                        store.filter.value === filter.hide
                          ? 'primary'
                          : 'default'
                      "
                      @click="
                        () => {
                          store.filter.value = filter.hide
                        }
                      "
                      >Hide</n-button
                    >
                  </n-button-group>
                  <n-button-group style="margin-left: 20px">
                    <n-button @click="handleSortByDate">By Date</n-button>
                    <n-button @click="handleSortByNo">By No</n-button>
                  </n-button-group>
                </n-space>
                <n-space>
                  <n-button
                    strong
                    secondary
                    circle
                    type="primary"
                    @click="handleAddProblem"
                  >
                    <template #icon>
                      <n-icon>
                        <add-outline />
                      </n-icon>
                    </template>
                  </n-button>
                </n-space>
              </n-space>
            </n-space>
          </n-card>
          <ProblemCard v-for="problem in store.list.value" :id="problem.id" />
        </n-space>
      </n-layout-content>
    </n-layout>
  </n-space>
</template>

<style scoped>
  .n-layout-header,
  .n-layout-footer {
    background: rgba(128, 128, 128, 0.2);
    padding: 24px;
  }

  .n-layout-content {
    background: rgba(121, 121, 121, 0.1);
  }

  /* .n-card {
    margin-bottom: 10px !important;
  } */
</style>
