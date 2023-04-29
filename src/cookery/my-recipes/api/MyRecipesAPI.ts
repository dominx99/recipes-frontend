import axios from "../../app/axios";
import { PaginatedResponse } from "../../matching-recipes/api/MatchingRecipesAPI";
import { Recipe } from "../../matching-recipes/domain/MatchingRecipe";

export function addRecipe(recipe: Recipe) {
  return new Promise<boolean>(async (resolve, reject) => {
    try {
      await axios().post('api/v1/my-recipes', recipe);

      resolve(true);
    } catch (e: any) {
      if (e.response && e.response.status === 401) {
        window.location.href = '/login';
      }

      reject('Could not add recipe to favorites');
    }
  })
}

export function fetchAllMyRecipes() {
  return new Promise<{ data: PaginatedResponse<Recipe> }>(async (resolve, reject) => {
    try {
      const response = await axios().get('api/v1/my-recipes');

      resolve(response);
    } catch (e: any) {
      reject('Could not fetch my recipes');
    }
  })
}
