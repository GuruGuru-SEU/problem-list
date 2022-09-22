import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { SERVER_URL } from './api.js'
import { filter } from './filter.js'
import axios from 'axios'

function createProblem() {
  return {
    id: uuidv4(),
    no: 'ProblemNo',
    weight: 0,
    hidden: false,
    url: '#',
    tags: '',
    memo: '',
    difficulty: 3,
    p1SubmissionUrl: '',
    p2SubmissionUrl: '',
    p3SubmissionUrl: '',
    date: new Date(),
  }
}

class Store {
  constructor() {
    this.list = new ref([])
    this.filter = new ref(filter.hide)
  }
  getFilter() {
    return this.filter.value
  }
  async fetchProblems() {
    this.list.value = []
    const response = await axios.get(
      `${SERVER_URL}/problems?_sort=date&_order=desc`
    )
    this.list.value = response.data
  }
  async sortByDate() {
    this.list.value = []
    const response = await axios.get(
      `${SERVER_URL}/problems?_sort=date&_order=desc`
    )
    this.list.value = response.data
  }
  async sortByNo() {
    this.list.value = []
    const response = await axios.get(
      `${SERVER_URL}/problems?_sort=no&_order=aesc`
    )
    this.list.value = response.data
  }
  async addProblem() {
    const problem = createProblem()
    await axios.post(`${SERVER_URL}/problems`, problem)
    this.fetchProblems()
  }
  getProblem(id) {
    return this.list.value.find((item) => item.id === id)
  }
  async removeProblem(id) {
    await axios.delete(`${SERVER_URL}/problems/${id}`)
    this.fetchProblems()
  }
}

const store = new Store()

export default store
