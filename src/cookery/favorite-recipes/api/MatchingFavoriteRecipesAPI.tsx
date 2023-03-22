import axios from "../../app/axios";
import { FetchMatchingRecipesResponse } from "../../matching-recipes/api/MatchingRecipesAPI";

export function fetchAllMatchingFavoriteRecipes() {
  return new Promise<{ data: FetchMatchingRecipesResponse }>(async (resolve, reject) => {
    try {
      const res = await axios().get('/api/v1/recipes/match-by-favorites');

      resolve(res);

      return;
    } catch (e) {
      reject('Could not fetch matching favorite recipes');
    }
  })
}
