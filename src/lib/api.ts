import { DICTIONARIES } from '~/lib/text'
import type { Dictionary } from '~/lib/types'

const api = {
  dictionaries: {
    fetch: async (locale: string): Promise<Dictionary> =>
      DICTIONARIES?.[locale] ?? DICTIONARIES.default,
  },
}

export default api
