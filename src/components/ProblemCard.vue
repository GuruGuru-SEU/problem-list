<script setup>
  import { computed } from '@vue/reactivity'
  import axios from 'axios'
  import { ref, h } from 'vue'
  import { genUrlFromNo } from '../utils'
  import { SERVER_URL } from '../api'
  import {
    NCard,
    NButton,
    NInput,
    NFormItem,
    NForm,
    NRate,
    NCheckbox,
    NIcon,
    NSpace,
    NPopconfirm,
    NTag,
  } from 'naive-ui'
  import {
    CaretBackOutline,
    CaretDownOutline,
    TrashOutline,
  } from '@vicons/ionicons5'
  import store from '../store'

  const { id } = defineProps({ id: String })
  const problem = ref(computed(() => store.getProblem(id)))
  const showInfo = ref(false)
  const filter = ref(computed(() => store.getFilter()))
  const tagList = ref([])
  const finished = ref(false)

  function convertTagList(tags) {
    const res = []
    tags.split(',').map((tagsTemp) => {
      tagsTemp.split('，').map((tag) => {
        if (tag.length > 0) {
          res.push(tag)
        }
      })
    })
    return res
  }

  tagList.value = convertTagList(problem.value.tags)
  finished.value =
    !!problem.value.p1SubmissionUrl &&
    !!problem.value.p2SubmissionUrl &&
    !!problem.value.p3SubmissionUrl

  function patch(id, data) {
    axios.patch(`${SERVER_URL}/problems/${id}`, data)
  }

  function toggleShowInfo() {
    showInfo.value = !showInfo.value
  }
  function onChangeUrl() {
    patch(problem.value.id, { url: problem.value.url })
  }
  function onChangeNo() {
    patch(problem.value.id, { no: problem.value.no })
    const genUrl = genUrlFromNo(problem.value.no)
    if (genUrl) {
      problem.value.url = genUrl
      onChangeUrl()
    }
  }
  function onChangeMemo() {
    patch(problem.value.id, { memo: problem.value.memo })
  }
  function onChangeTag() {
    patch(problem.value.id, { tags: problem.value.tags })
    tagList.value = []
    tagList.value = convertTagList(problem.value.tags)
  }
  function onChangeP1SubmissionUrl() {
    patch(problem.value.id, { p1SubmissionUrl: problem.value.p1SubmissionUrl })
    finished.value =
      !!problem.value.p1SubmissionUrl &&
      !!problem.value.p2SubmissionUrl &&
      !!problem.value.p3SubmissionUrl
  }
  function onChangeP2SubmissionUrl() {
    patch(problem.value.id, { p2SubmissionUrl: problem.value.p2SubmissionUrl })
    finished.value =
      !!problem.value.p1SubmissionUrl &&
      !!problem.value.p2SubmissionUrl &&
      !!problem.value.p3SubmissionUrl
  }
  function onChangeP3SubmissionUrl() {
    patch(problem.value.id, { p3SubmissionUrl: problem.value.p3SubmissionUrl })
    finished.value =
      !!problem.value.p1SubmissionUrl &&
      !!problem.value.p2SubmissionUrl &&
      !!problem.value.p3SubmissionUrl
  }
  function onChangeHidden() {
    patch(problem.value.id, { hidden: problem.value.hidden })
  }
  function onChangeDifficulty() {
    patch(problem.value.id, { difficulty: problem.value.difficulty })
  }
  function handleDeleteProblem() {
    store.removeProblem(problem.value.id)
  }
</script>

<template>
  <n-card
    hoverable
    v-if="filter(problem)"
    :style="
      filter(problem)
        ? 'margin-top: 10px!important'
        : 'margin-top: 0px!important'
    "
    :title="
      h('n-space', [
        h('a', {
          href: problem.url,
          text: problem.no,
          target: '_blank',
          style:
            'margin-right: 20px; margin-left: 10px;' +
            (finished ? 'text-decoration: line-through;' : ''),
        }),
        h('span', {
          innerText: problem.memo,
          style: 'font-size: 0.9em',
        }),
      ])
    "
    size="small"
    ><template #header-extra>
      <n-space align="center">
        <n-space size="small">
          <n-tag
            :bordered="false"
            round
            type="success"
            size="small"
            v-for="tag in tagList"
            >{{ tag }}</n-tag
          >
        </n-space>
        <n-space size="small">
          <n-popconfirm @positive-click="handleDeleteProblem">
            <template #trigger>
              <n-button strong secondary circle type="error">
                <template #icon>
                  <n-icon>
                    <trash-outline />
                  </n-icon>
                </template>
              </n-button>
            </template>
            Are you sure you want to remove {{ problem.no }}?
          </n-popconfirm>

          <n-button strong secondary circle type="info" @click="toggleShowInfo">
            <template #icon>
              <n-icon>
                <caret-back-outline v-if="showInfo" /><caret-down-outline
                  v-else
                />
              </n-icon>
            </template>
          </n-button>
        </n-space>
      </n-space>
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
          <n-input
            size="small"
            v-model:value="problem.url"
            @change="onChangeUrl"
          />
        </n-form-item>
        <n-form-item size="small" label="备注">
          <n-input
            size="small"
            v-model:value="problem.memo"
            @change="onChangeMemo"
          />
        </n-form-item>
        <n-form-item size="small" label="标签">
          <n-input
            size="small"
            v-model:value="problem.tags"
            @change="onChangeTag"
          />
        </n-form-item>
      </n-form>
      <n-form inline>
        <n-form-item size="small" label="luckyJim">
          <n-input
            size="small"
            placeholder="Submission URL"
            v-model:value="problem.p1SubmissionUrl"
            @change="onChangeP1SubmissionUrl"
          />
        </n-form-item>
        <n-form-item size="small" label="rabbyte">
          <n-input
            size="small"
            placeholder="Submission URL"
            v-model:value="problem.p2SubmissionUrl"
            @change="onChangeP2SubmissionUrl"
          />
        </n-form-item>
        <n-form-item size="small" label="tth37">
          <n-input
            size="small"
            placeholder="Submission URL"
            v-model:value="problem.p3SubmissionUrl"
            @change="onChangeP3SubmissionUrl"
          />
        </n-form-item>
        <n-form-item size="small" label="状态">
          <n-checkbox v-model:checked="problem.hidden" @click="onChangeHidden"
            >隐藏</n-checkbox
          >
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

<style scoped>
  a {
    color: rgb(0, 29, 193);
    text-decoration: none;
    font-weight: bold;
    font-size: 1.1em;
  }
</style>
