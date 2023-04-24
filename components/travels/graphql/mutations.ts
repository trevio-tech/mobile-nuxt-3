export const CREATE_TRAVEL = `
  mutation ($input: TravelInput!) {
    travelForm: createTravel(input: $input)
  }
`

export const UPDATE_TRAVEL = `
  mutation ($id: ID!, $input: TravelInput!) {
    travelForm: updateTravel(id: $id, input: $input)
  }
`

export const DELETE_TRAVEL = `
  mutation deleteTravel($id: ID!) {
    deleteContent: deleteTravel(id: $id)
  }
`