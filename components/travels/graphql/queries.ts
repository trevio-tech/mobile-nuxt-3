export const TRAVEL_CARD = `
  id
  user_id
  title
  text(words: 12)
  likes_count
  system_name
  created_at
  published_at
  cover {
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
  like {
    is_liked
  }
`

export const TRAVEL = `
  id
  place_id
  user_id
  title
  text
  date_start
  date_end
  system_name
  nested_entries_count
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
    id
    name
    full_name
  }
  bookmarks {
    category_id
  }
  cover {
    id
    url(presets: "default@resize:fit:640")
  }
`