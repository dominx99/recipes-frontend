import axios from "../../app/axios";
import { FetchMatchingRecipesResponse } from "../../matching-recipes/api/MatchingRecipesAPI";

export function fetchAllMatchingFavoriteRecipes(nextPageUrl?: string) {
  return new Promise<{ data: FetchMatchingRecipesResponse }>(async (resolve, reject) => {
    try {
      if (nextPageUrl) {
        const res = await axios().get(nextPageUrl);

        resolve(res);

        return;
      }

      const res = await axios().get('/api/v1/recipes/match-by-favorites');

      resolve(res);
    } catch (e) {
      reject('Could not fetch matching favorite recipes');
    }
  })
}
