<script setup>
  import { computed } from '@vue/reactivity'
  import axios from 'axios'
  import { ref, h } from 'vue'
  import {
    NCard,
    NButton,
    NInput,
    NFormItem,
    NForm,
    NRate,
    NCheckbox,
  } from 'naive-ui'
  import store from '../store'

  const { id } = defineProps({ id: String })
  const problem = ref(computed(() => store.getProblem(id)))
  const showInfo = ref(false)
  const filter = ref(computed(() => store.getFilter()))

  function patch(id, data) {
    const SERVER_URL = 'http://localhost:3737'
    axios.patch(`${SERVER_URL}/problems/${id}`, data)
  }

  function toggleShowInfo() {
    showInfo.value = !showInfo.value
  }

  function onChangeNo() {
    console.log(problem.value)
  }
</script>

<template>
  <n-card
    style="margin-top: 10px"
    v-if="filter(problem)"
    :title="
      h('span', [
        h('a', {
          href: problem.url,
          text: problem.no,
          target: '_blank',
          style: 'margin-right: 20px;',
        }),
        h('span', {
          innerText: problem.memo,
          style: 'font-size: 0.85em',
        }),
      ])
    "
    size="small"
    ><template #header-extra>
      <n-button strong secondary type="info" @click="toggleShowInfo">
        Info
      </n-button>
    </template>
    <template #footer v-if="showInfo"></template>
    <template #action v-if="showInfo">
      <n-form inline>
        <n-form-item size="small" label="题号">
          <n-input
            size="small"
            v-model:value="problem.no"
            @change="onChangeNo"
          />
        </n-form-item>
        <n-form-item size="small" label="URL">
          <n-input size="small" v-model:value="problem.url" />
        </n-form-item>
        <n-form-item size="small" label="备注">
          <n-input size="small" v-model:value="problem.memo" />
        </n-form-item>
        <n-form-item size="small" label="标签">
          <n-input size="small" v-model:value="problem.tags" />
        </n-form-item>
      </n-form>
      <n-form inline>
        <n-form-item size="small" label="luckyJim">
          <n-input
            size="small"
            placeholder="Submission"
            v-model:value="problem.p1SubmissionUrl"
          />
        </n-form-item>
        <n-form-item size="small" label="rabbyte">
          <n-input
            size="small"
            placeholder="Submission"
            v-model:value="problem.p2SubmissionUrl"
          />
        </n-form-item>
        <n-form-item size="small" label="tth37">
          <n-input
            size="small"
            placeholder="Submission"
            v-model:value="problem.p3SubmissionUrl"
          />
        </n-form-item>
        <n-form-item size="small" label="状态">
          <n-checkbox v-model:checked="problem.hidden">隐藏</n-checkbox>
        </n-form-item>
      </n-form>
      <n-form inline>
        <n-form-item size="small" label="难度">
          <n-rate
            v-model:value="problem.difficulty"
            @click="onChangeDifficulty"
          />
        </n-form-item>
      </n-form>
    </template>
  </n-card>
</template>
