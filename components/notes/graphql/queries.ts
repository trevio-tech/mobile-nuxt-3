import { PLACE_WITH_PARENTS_FIELDS } from '~/components/places/graphql'

export const NOTE_CARD = `
  id
  title
  user_id
  place_id
  travel_id
  cover_id
  text(words: 20)
  likes_count
  system_name
  messages_count
  published_at(format: "d.m.Y в h:m")
  can
  cover {
    id
    url(presets: "default@resize:fill:560:320")
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
  bookmarks {
    category_id
  }
`

export const NOTE = `
  note(id: $id) {
    id
    user_id
    place_id
    title
    short_text: text(words: 20)
    text
    can
    system_name
    likes_count
    published_at(format: "relative")
    cover {
      id
      url(presets: "default@resize:fill:560:320")
    }
    tags {
      id
      name
    }
    bookmarks {
      user_id
      model_id
      model_type
      category_id
    }
    like {
      is_liked
    }
    user {
      id
      name
      avatar
      description
    }
  }
`

export const NOTE_FORM = `
  id
  place_id
  travel_id
  cover_id
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