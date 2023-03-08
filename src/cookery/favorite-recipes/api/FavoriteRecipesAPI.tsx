import axios from "../../app/axios";
import { Recipe } from "../../matching-recipes/domain/MatchingRecipe";

export const addRecipeToFavorite = (recipe: Recipe) => {
  return new Promise((resolve, reject) => {
    try {
      const res = axios().post('api/v1/favorite-recipes', {
        recipeId: recipe.id,
      });

      resolve(res);
    } catch (e) {
      reject('Could not add recipe to favorites');
    }
  })
}

