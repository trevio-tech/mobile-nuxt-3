export const PLACE_WITH_PARENTS_FIELDS = `
  id
  parent_id
  name
  full_name
  rating
  reviews_count
  reviews_count_1
  reviews_count_2
  reviews_count_3
  reviews_count_4
  reviews_count_5
  parent {
    id
    parent_id
    name
    parent {
      id
      parent_id
      name
      parent {
        id
        parent_id
        name
      }
    }
  }
`