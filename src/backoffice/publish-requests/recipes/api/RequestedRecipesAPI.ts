import axios from "../../../../cookery/app/axios";
import { PaginatedResponse } from "../../../../cookery/matching-recipes/api/MatchingRecipesAPI";
import { Recipe } from "../../../../cookery/matching-recipes/domain/MatchingRecipe";

export function fetchAllRequestedRecipes(page: number) {
  return new Promise<{ data: PaginatedResponse<Recipe> }>(async (resolve, reject) => {
    try {
      const response = await axios().get(`api/v1/requested-recipes`, {
        params: {
          page: page,
        },
      });

      resolve(response);
    } catch (e: any) {
      reject('Could not fetch recipes');
    }
  })
}

export function acceptRecipeRequest(recipeId: string) {
  return new Promise(async () => {
    axios().post(`api/v1/publish-recipe-request/${recipeId}/accept`);
  })
}

export function rejectRecipeRequest(recipeId: string) {
  return new Promise(async () => {
    axios().post(`api/v1/publish-recipe-requests/${recipeId}/reject`);
  })
}
