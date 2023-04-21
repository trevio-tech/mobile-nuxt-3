export const CREATE_QUESTION = `
  mutation ($input: QuestionInput!) {
    questionForm: createQuestion(input: $input)
  }
`

export const UPDATE_QUESTION = `
  mutation ($id: ID!, $input: QuestionInput!) {
    questionForm: updateQuestion(id: $id, input: $input)
  }
`

export const DELETE_QUESTION = `
  mutation ($id: ID!) {
    deleteContent: deleteQuestion(id: $id)
  }
`