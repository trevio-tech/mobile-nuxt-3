export const CREATE_NOTE = `
  mutation ($input: NoteInput!) {
    noteForm: createNote(input: $input)
  }
`

export const UPDATE_NOTE = `
  mutation ($id: ID!, $input: NoteInput!) {
    noteForm: updateNote(id: $id, input: $input)
  }
`

export const DELETE_NOTE = `
  mutation deleteNote($id: ID!) {
    deleteNote(id: $id)
  }
`