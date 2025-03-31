import { DICTIONARIES } from "~/lib/text";
import type { Dictionary } from "~/lib/types";

const api = {
  dictionaries: {
    fetch: async (locale: string): Promise<Dictionary> => {
      const dictionary = DICTIONARIES?.[locale] ?? DICTIONARIES.default;
      if (!dictionary) {
        throw new Error(
          `Dictionary for locale "${locale}" or default dictionary not found.`,
        );
      }
      return dictionary;
    },
  },
};

export default api;
