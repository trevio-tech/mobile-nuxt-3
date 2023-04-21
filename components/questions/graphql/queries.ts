import { PLACE_WITH_PARENTS_FIELDS } from '~/components/places/graphql'

export const QUESTION_CARD = `
  id
  title
  user_id
  place_id
  travel_id
  cover_id
  text(words: 20)
  published_at(format: "d.m.Y")
  likes_count
  system_name
  created_at
  can
  resolved_at(format: "d.m.Y")
  cover {
    id
    url
  }
  bookmarks {
    category_id
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
  user {
    id
    name
    avatar
  }
  tags {
    id
    name
  }
  like {
    is_liked
  }
`

export const QUESTION = `
  id
  user_id
  place_id
  title
  text
  system_name
  likes_count
  bookmarks {
    category_id
  }
  user {
    id
    name
    avatar
  }
  tags {
    id
    name
  }
  like {
    is_liked
  }
`

export const QUESTION_FORM = `
  id
  place_id
  travel_id
  title
  text(raw: true)
  is_draft
  tags {
    id
    name
  }
  place {
    ${PLACE_WITH_PARENTS_FIELDS}
  }
`