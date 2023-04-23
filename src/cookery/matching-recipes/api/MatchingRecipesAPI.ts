import axios from "../../app/axios";
import { MatchingRecipe } from "../domain/MatchingRecipe";

export interface PaginatedResponse<T> {
  data: T[],
  meta: {
    page: number,
    has_next_page: boolean,
  }
}

export interface FetchMatchingRecipesResponse extends PaginatedResponse<MatchingRecipe> {
}

export function fetchMatchingRecipesByIngredients(products: string[], page: number) {
  return new Promise<{ data: FetchMatchingRecipesResponse }>(async (resolve) => {
    const res = await axios().get('api/v1/recipes/match-by-products', {
      params: {
        products,
        page
      }
    });

    resolve(res);
  });
}
