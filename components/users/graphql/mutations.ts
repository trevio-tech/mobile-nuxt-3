
export const UPDATE_USER = `
  mutation updateUser ($id: ID!, $input: UserInput!) {
    updateUser(id: $id, input: $input)
  }
`
export const UPDATE_PASSWORD = `
  mutation updatePassword($input: UpdatePasswordInput!) {
    updatePassword(input: $input)
  }
`