<template>
  <div class="mcg-page">
    <div v-if="loading" class="loading-page">
      <p>Loading questions...</p>
    </div>
    <div v-if="!loading" class="form-wrap">
      <div class="question timer">
        Remaining time <span class="timer-text">00:00:{{ timerCount }}</span>
      </div>
      <form>
        <div
          v-for="(question, i) in questionList"
          :key="question._id"
          class="question"
        >
          <h3>{{ i + 1 }}. {{ question.title }}</h3>
          <div v-for="option in question.options" :key="option" class="input">
            <input
              v-model="answers[question._id]"
              type="radio"
              :name="`radio_${question._id}`"
              :value="option"
              :disabled="checkIfSelected(question._id)"
            />
            <label :for="option">{{ option }}</label>
          </div>
        </div>
        <div class="btn-wrap">
          <a class="btn finish-btn" @click="finishQuiz">FINISH</a>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data: () => ({
    loading: true,
    pageTitle: 'MCQ TEST',
    limit: 30,
    baseURLAPI: `${process.env.baseUrlAPI}`,
    questionList: [],
    answers: {},
    score: 0,
    timerCount: 15,
  }),
  computed: {
    questionsAPI() {
      return `https://nestjs-mcq-quiz-api.herokuapp.com/api/questions`
    },
  },
  watch: {
    options: {
      handler() {
        setTimeout(() => {
          this.fetchQuestions()
        }, 500)
      },
      deep: true,
    },
    timerCount: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.timerCount--

            if (this.timerCount === 0 && !this.loading) {
              this.finishQuiz()
            }
          }, 1000)
        }
      },
      immediate: true,
    },
  },
  created() {
    this.fetchQuestions()
  },
  methods: {
    async fetchQuestions() {
      await axios.get(this.questionsAPI).then((response) => {
        // console.log(response)

        // setTimeout(() => {
        this.questionList = response && response.data && response.data.data
        this.loading = false
        this.timerCount = 15
        // }, 20000)
      })
      // console.log(':', this.loading)
    },
    finishQuiz() {
      this.score = 0
      Object.keys(this.answers).map((a) => {
        if (
          this.answers[a] ===
          this.questionList.filter((q) => q._id === a)[0].answer
        ) {
          this.score = this.score + 1
        }
        return this.score
      })
      this.$store.commit('updateScore', this.score)

      this.$router.push({ path: '/result' })
    },
    checkIfSelected(q) {
      return Object.keys(this.answers).includes(q)
    },
  },
}
</script>
