import axios from "../../axios";
import { MatchingRecipe } from "../domain/MatchingRecipe";

export interface PaginatedResponse<T> {
  data: T[],
  is_first_page: boolean,
  next_page_url?: string,
}

interface FetchMatchingRecipesByIngredientsResponse extends PaginatedResponse<MatchingRecipe> {
}

export function fetchMatchingRecipesByIngredients(products: string[], next_page_url: string | null) {
  return new Promise<{ data: FetchMatchingRecipesByIngredientsResponse }>(async (resolve) => {
    if (next_page_url) {
      const res = await axios().get(next_page_url);

      resolve(res);

      return;
    }

    const res = await axios().get('api/v1/recipes/match-by-products', {
      params: {
        products,
        perPage: 24,
      }
    });

    resolve(res);
  });
}
