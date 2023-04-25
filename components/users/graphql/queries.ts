import { ALBUM_CARD } from '~/components/albums/graphql'
import { LINK } from '~/components/links/graphql'
import { NOTE_CARD} from '~/components/notes/graphql'
import { PLACE_WITH_PARENTS_FIELDS } from '~/components/places/graphql'
import { QUESTION_CARD } from '~/components/questions/graphql'
import { REVIEW_CARD } from '~/components/reviews/graphql'
import { TRAVEL_CARD} from '~/components/travels/graphql'

export const USER = `
  id
  place_id
  name
  avatar
  banner
  description
  birthday(format: "d.m.Y")
  gender
  subscribers_count
  subscriptions_count
  travels_count
  created_at(format: "relative")
  place {
    ${PLACE_WITH_PARENTS_FIELDS}
  }
  links {
    ${LINK}
  }
`

export const NESTED_USER_CONTENT = `
  ...on Travel {
    ${TRAVEL_CARD}
  }
  ...on Note {
    ${NOTE_CARD}
  }
  ...on Review {
    ${REVIEW_CARD}
  }
  ...on Question {
    ${QUESTION_CARD}
  }
  ...on Album {
    ${ALBUM_CARD}
  }
`