export const CREATE_REVIEW = `
  mutation ($input: ReviewInput!) {
    reviewForm: createReview(input: $input)
  }
`

export const UPDATE_REVIEW = `
  mutation ($id: ID!, $input: ReviewInput!) {
    reviewForm: updateReview(id: $id, input: $input)
  }
`

export const DELETE_REVIEW = `
  mutation ($id: ID!) {
    deleteContent: deleteReview(id: $id)
  }
`