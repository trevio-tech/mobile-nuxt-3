export default [
  { path: '/questions/:questionId(\\d+)', name: 'questions.show', file: 'show'},
  { path: '/questions/create', name: 'questions.create', file: 'form'},
  { path: '/questions/:questionId(\\d+)/edit', name: 'questions.edit', file: 'form'},
]