import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/app/hooks";
import { addRecipeToFavoriteAsync, favoriteRecipesSelectors } from "../../favorite-recipes/api/FavoriteRecipesSlice";
import FavoriteRecipe from "../../favorite-recipes/domain/FavoriteRecipe";
import RecipeCard from "../../recipes/components/RecipeCard";
import { Recipe } from "../domain/MatchingRecipe";

interface MatchingRecipeCardProps {
  recipe: Recipe;
}

export default function MatchingRecipeCard({ recipe }: MatchingRecipeCardProps) {
  const dispatch = useAppDispatch();

  const favoriteRecipes: FavoriteRecipe[] = useAppSelector(favoriteRecipesSelectors.selectAll);

  const handleAddToFavorites = (recipe: Recipe) => () => {
    dispatch(addRecipeToFavoriteAsync(recipe));
  }

  const isRecipeFavorite = useMemo(() => {
    return favoriteRecipes.some((favoriteRecipe) => favoriteRecipe.recipeId === recipe.id);
  }, [favoriteRecipes, recipe]);

  return (
    <RecipeCard
      recipe={recipe}
      action={
        <IconButton
          onClick={handleAddToFavorites(recipe)}
        >
          {
            isRecipeFavorite
              ? <Favorite
                color="error"
              />
              : <FavoriteBorder
                color="error"
              />
          }
        </IconButton>
      }
    />
  );
}
