import axios from "../../app/axios";
import { Recipe } from "../../matching-recipes/domain/MatchingRecipe";
import FavoriteRecipe from "../domain/FavoriteRecipe";
import { v4 as uuidv4 } from 'uuid';

export const addRecipeToFavorite = (recipe: Recipe) => {
  return new Promise<{data: FavoriteRecipe}>(async (resolve, reject) => {
    try {
      const favoriteRecipe: FavoriteRecipe = {
        id: uuidv4(),
        recipe_id: recipe.id,
      };

      await axios().post('api/v1/favorite-recipes', favoriteRecipe);

      resolve({ data: favoriteRecipe });
    } catch (e: any) {
      if (e.response && e.response.status === 401) {
        window.location.href = '/login';
      }

      reject('Could not add recipe to favorites');
    }
  })
}

export const removeRecipeFromFavorites = (favoriteRecipe: FavoriteRecipe) => {
  return new Promise<{data: FavoriteRecipe}>(async (resolve, reject) => {
    try {
      await axios().delete('api/v1/favorite-recipes/' + favoriteRecipe.id);

      resolve({ data: favoriteRecipe });
    } catch (e) {
      reject('Could not remove recipe from favorites');
    }
  })
}

export const fetchFavoriteRecipes = () => {
  return new Promise<{data: FavoriteRecipe[]}>(async (resolve, reject) => {
    try {
      const res = await axios().get('api/v1/favorite-recipes');

      resolve(res);
    } catch (e) {
      reject('Could not fetch favorite recipes');
    }
  });
}
