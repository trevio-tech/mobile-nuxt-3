import { PLACE_WITH_PARENTS_FIELDS } from '~/components/places/graphql'

export const REVIEW_CARD = `
  id
  user_id
  cover_id
  title
  text(words: 12)
  likes_count
  can
  system_name
  published_at(format: "d.m.Y в h:m")
  like {
    is_liked
  }
  cover {
    id
    url(presets: "default@resize:fill:640:320")
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
  bookmarks {
    category_id
  }
  place {
    ${PLACE_WITH_PARENTS_FIELDS}
  }
`

export const REVIEW = `
  id
  user_id
  place_id
  system_name
  title
  text
  can
  stars
  likes_count
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
  place {
    ${PLACE_WITH_PARENTS_FIELDS}
  }
`

export const REVIEW_FORM = `
  id
  place_id
  travel_id
  title
  text(raw: true)
  is_draft
  stars
  tags {
    id
    name
  }
  place {
    ${PLACE_WITH_PARENTS_FIELDS}
  }
`