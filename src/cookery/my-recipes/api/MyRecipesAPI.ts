import axios from "../../app/axios";
import { PaginatedResponse } from "../../matching-recipes/api/MatchingRecipesAPI";
import { Recipe } from "../../matching-recipes/domain/MatchingRecipe";
import { IRecipeForm } from "../../recipes/components/RecipeForm";
import { AddedEntity } from "../../shared/api/APIUtils";

export function addRecipe(recipe: IRecipeForm) {
  return new Promise<{ data: AddedEntity }>(async (resolve, reject) => {
    try {
      const res = await axios().post('api/v1/recipes', { ...recipe });

      resolve(res);
    } catch (e: any) {
      if (e.response.status === 400) {
        reject({
          message: JSON.stringify(e.response.data.errors),
          code: 'ERR_BAD_REQUEST',
        });

        return;
      }
      reject(e)
    }
  })
}

export function updateRecipe(recipe: IRecipeForm) {
  return new Promise<{}>(async (resolve, reject) => {
    try {
      if (recipe.id === undefined) {
        throw new Error('Recipe id is undefined');
      }

      const res = await axios().put(`api/v1/recipes/${recipe.id}`, {
        name: recipe.name,
        components: recipe.components.map(c => ({
          name: c.name,
          quantity: c.quantity,
          unit: c.unit,
        })),
      });

      resolve(res);
    } catch (e: any) {
      if (e.response.status === 400) {
        reject({
          message: JSON.stringify(e.response.data.errors),
          code: 'ERR_BAD_REQUEST',
        });

        return;
      }
      reject(e)
    }
  })
}


export function removeRecipe(recipeId: string) {
  return new Promise<{ data: { id: string } }>(async (resolve, reject) => {
    try {
      await axios().delete(`api/v1/recipes/${recipeId}`);

      resolve({ data: { id: recipeId } });
    } catch (e: any) {
      reject(e)
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

export function fetchRecipeById(recipeId: string) {
  return new Promise<{ data: Recipe }>(async (resolve, reject) => {
    try {
      const response = await axios().get(`api/v1/recipes/${recipeId}`);

      resolve(response);
    } catch (e: any) {
      reject('Could not fetch recipe');
    }
  })
}

export function publishRecipe(recipeId: string) {
  return new Promise<{ data: Recipe }>(async (resolve, reject) => {
    try {
      const response = await axios().post(`api/v1/recipes/${recipeId}/publish`);

      resolve(response);
    } catch (e: any) {
      reject('Could not publish recipe');
    }
  });
}

export function fetchRecipesByIds(recipeIds: string[]) {
  return new Promise<{ data: PaginatedResponse<Recipe> }>(async (resolve, reject) => {
    try {
      const response = await axios().get(`api/v1/recipes/by-ids`, {
        params: {
          ids: recipeIds,
        },
      });

      resolve(response);
    } catch (e: any) {
      reject('Could not fetch recipes');
    }
  })
}
