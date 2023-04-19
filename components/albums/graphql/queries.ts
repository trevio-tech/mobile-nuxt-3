import { PLACE_WITH_PARENTS_FIELDS } from '~/components/places/graphql'

export const ALBUM_CARD = `
  id
  title
  place_id
  user_id
  travel_id
  cover_id
  text(words: 20)
  likes_count
  system_name
  can
  published_at
  bookmarks {
    category_id
  }
  cover {
    id
    url(presets: "default@resize:fill:560:320")
  }
  like {
    is_liked
  }
  travel {
    id
    place_id
    title
    place {
      id
      name
    }
  }
  tags {
    id
    name
  }
  user {
    id
    name
    avatar
  }
`

export const ALBUM = `
  id
  user_id
  place_id
  travel_id
  title
  text
  is_draft
  image_order
  system_name
  travel {
    id
    title
  }
  images {
    id
    url(presets: "default@resize:fill:126:126")
  }
  tags {
    id
    name
  }
  user {
    id
    name
    avatar
  }
  place {
    ${PLACE_WITH_PARENTS_FIELDS}
  }
`