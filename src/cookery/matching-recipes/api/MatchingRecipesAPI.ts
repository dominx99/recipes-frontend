import axios from "../../app/axios";
import { MatchingRecipe } from "../domain/MatchingRecipe";

export interface PaginatedResponse<T> {
  data: T[],
  is_first_page: boolean,
  next_page_url?: string,
}

export interface FetchMatchingRecipesResponse extends PaginatedResponse<MatchingRecipe> {
}

export function fetchMatchingRecipesByIngredients(products: string[], next_page_url: string | null) {
  return new Promise<{ data: FetchMatchingRecipesResponse }>(async (resolve) => {
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
