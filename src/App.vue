<script setup>
  import { filter } from './filter'
  import {
    NSpace,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NCard,
    NSelect,
    NForm,
    NFormItem,
  } from 'naive-ui'
  import ProblemCard from './components/ProblemCard.vue'
  import store from './store'

  const filterOptions = [
    {
      label: '部分隐藏',
      value: filter.hide,
    },
    {
      label: '全部显示',
      value: filter.all,
    },
  ]
</script>

<template>
  <n-space vertical size="large">
    <n-layout>
      <n-layout-header>GuruGuru Problem List</n-layout-header>
      <n-layout-content content-style="padding: 30px;">
        <n-space
          vertical
          size="medium"
          style="max-width: 1050px; margin-left: auto; margin-right: auto"
        >
          <n-card>
            <n-form inline>
              <n-form-item size="medium" label="过滤器">
                <n-select
                  v-model:value="store.filter.value"
                  :options="filterOptions"
                  style="width: 150px"
                ></n-select>
              </n-form-item>
            </n-form>
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

  .n-layout-sider {
    background: rgba(128, 128, 128, 0.3);
  }

  .n-layout-content {
    background: rgba(128, 128, 128, 0.4);
  }

  .n-space {
    gap: 0px 0px !important;
  }
</style>
