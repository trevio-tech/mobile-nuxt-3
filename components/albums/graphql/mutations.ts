export const CREATE_ALBUM = `
  mutation ($input: AlbumInput!) {
    albumForm: createAlbum(input: $input)
  }
`

export const UPDATE_ALBUM = `
  mutation ($id: ID!, $input: AlbumInput!) {
    albumForm: updateAlbum(id: $id, input: $input)
  }
`

export const DELETE_ALBUM = `
  mutation ($id: ID!) {
    deleteContent: deleteAlbum(id: $id)
  }
`