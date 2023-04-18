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