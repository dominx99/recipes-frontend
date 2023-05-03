import axios from "../../app/axios";
import { PaginatedResponse } from "../../matching-recipes/api/MatchingRecipesAPI";
import { Recipe } from "../../matching-recipes/domain/MatchingRecipe";
import { IRecipeForm } from "../../recipes/components/AddRecipeForm";
import { AddedEntity } from "../../shared/api/APIUtils";

export function addRecipe(recipe: IRecipeForm) {
  return new Promise<{ data: AddedEntity }>(async (resolve, reject) => {
    try {
      const res = await axios().post('api/v1/recipes', { ...recipe });

      resolve(res);
    } catch (e: any) {
      if (e.response && e.response.status === 401) {
        window.location.href = '/login';
      }

      reject('Could not add recipe to favorites');
    }
  })
}

export function fetchAllMyRecipes(page: number) {
  return new Promise<{ data: PaginatedResponse<Recipe> }>(async (resolve, reject) => {
    try {
      const response = await axios().get('api/v1/my-recipes', {
        params: { page }
      });

      resolve(response);
    } catch (e: any) {
      reject('Could not fetch my recipes');
    }
  })
}
