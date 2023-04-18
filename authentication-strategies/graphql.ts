import { LocalScheme } from '#auth/runtime'
import { HTTPResponse } from '@nuxt-alt/auth'
import { useQuery } from '@trevio/ui'
export default class GraphQLScheme extends LocalScheme {
  /**
   * @param credentials
   * @param reset
   */
  async login(credentials, { reset = true } = {}): Promise<HTTPResponse> {
    // Ditch any leftover local tokens before attempting to log in.
    if (reset) {
      this.$auth.reset({ resetInterceptor: false });
    }

    try {
      const { data: { token } } = await useQuery({
        query: `
          query getJwtToken($email: String, $password: String) {
            token: login(email: $email, password: $password)
          }
        `,
        variables: {
          ...credentials
        }
      })

      if (token) {
        this.token.set(token)
      }

      await this.fetchUser()
    } catch (error) {
      throw error
    }
  }

  async fetchUser() {
    // Token is required but not available.
    if (! this.check().valid) {
      return
    }

    try {
      const { data } = await useQuery({
        query: `
          query getMe {
            me {
              id
              email
              name
              avatar
              wallet {
                balance
              }
              premium {
                color
                ends_at(format: "d.m.Y")
              }
            }
          }
        `,
      })

      this.$auth.setUser(data.me)

      return data
    } catch (error) {
      this.$auth.callOnError(error, {
        method: 'fetchUser'
      })

      return Promise.reject(error)
    }
  }

  async logout(): Promise<void> {
    await useQuery({
      query: `
        query logout {
          logout
        }
      `,
    })

    this.$auth.redirect('logout')

    return this.$auth.reset()
  }
}