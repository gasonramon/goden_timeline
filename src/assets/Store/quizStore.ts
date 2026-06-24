import { defineStore } from 'pinia'

export const quizStore = defineStore('quizquestion', {
  state: () => ({
    quizQuestion: 'no question yet',
  }),
  actions: {
    setQuizQuestion(question: string) {
      this.quizQuestion = question
    },
    getQuizQuestion() {
      return this.quizQuestion
    },
  },
})
