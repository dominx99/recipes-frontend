import axios from "../../axios";
import { MatchingRecipe } from "../domain/MatchingRecipe";

export function fetchMatchingRecipesByIngredients(products: string[]) {
  return new Promise<{ data: MatchingRecipe[] }>(async (resolve) => {
    const res = await axios().get('api/v1/recipes/match-by-products', {
      params: {
        products,
      }
    });

    resolve(res);
  });
}
