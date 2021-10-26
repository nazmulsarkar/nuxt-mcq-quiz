export const state = () => ({
  score: 0,
})

export const mutations = {
  updateScore(state, value) {
    state.score = value
  },
}
