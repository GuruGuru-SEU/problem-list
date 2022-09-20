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
  async applyFilter() {
    await this.fetchProblems()
    console.log('apply filter')
    console.log(this.list.value)
    this.list.value = this.list.value.filter(this.filter.value)
    console.log(this.list.value)
  }
  getFilter() {
    return this.filter.value
  }
  async fetchProblems() {
    const response = await axios.get(`${SERVER_URL}/problems`)
    this.list.value = response.data
  }
  addProblem() {
    const problem = createProblem()
    axios.post(`${SERVER_URL}/problems`, problem)
    this.list.value.unshift(problem)
  }
  getProblem(id) {
    return this.list.value.find((item) => item.id === id)
  }
}

const store = new Store()

await store.fetchProblems()

export default store
