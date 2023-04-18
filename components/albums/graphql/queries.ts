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