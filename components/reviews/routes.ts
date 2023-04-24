export default [
  { path: '/reviews/:reviewId(\\d+)', name: 'reviews.show', file: 'show'},
  { path: '/reviews/create', name: 'reviews.create', file: 'form'},
  { path: '/reviews/:reviewId(\\d+)/edit', name: 'reviews.edit', file: 'form'},
]