import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/app/hooks";
import LinearProgressWithLabel from "../../../shared/components/Progress/LinearProgressWithLabel";
import { addRecipeToFavoriteAsync, favoriteRecipesSelectors, removeRecipeFromFavoritesAsync, selectProcessingRecipeIds } from "../../favorite-recipes/api/FavoriteRecipesSlice";
import FavoriteRecipe from "../../favorite-recipes/domain/FavoriteRecipe";
import RecipeCard from "../../recipes/components/RecipeCard";
import { MatchingRecipe, Recipe } from "../domain/MatchingRecipe";

interface MatchingRecipeCardProps {
  matchingRecipe: MatchingRecipe;
  progressBar: boolean;
}

export default function MatchingRecipeCard({ matchingRecipe, progressBar }: MatchingRecipeCardProps) {
  const dispatch = useAppDispatch();

  const favoriteRecipes: FavoriteRecipe[] = useAppSelector(favoriteRecipesSelectors.selectAll);
  const processingFavoriteRecipeIds: string[] = useAppSelector(selectProcessingRecipeIds);
  const recipeId = matchingRecipe.recipe.id;

  const findFavoriteRecipe = (recipeId: string) => {
    return favoriteRecipes.find((favoriteRecipe) => favoriteRecipe.recipe_id === recipeId);
  }

  const isProcessingRecipe = useMemo(() => {
    return processingFavoriteRecipeIds.includes(recipeId);
  }, [processingFavoriteRecipeIds, recipeId]);

  const handleAddToFavorites = (recipe: Recipe) => () => {
    if (isProcessingRecipe) {
      return;
    }

    dispatch(addRecipeToFavoriteAsync(recipe));
  }

  const handleRemoveFromFavorites = () => () => {
    const favoriteRecipe = findFavoriteRecipe(recipeId);

    if (!favoriteRecipe || isProcessingRecipe) {
      return;
    }

    dispatch(removeRecipeFromFavoritesAsync(favoriteRecipe));
  }

  const isRecipeFavorite = useMemo(() => {
    return favoriteRecipes.some((favoriteRecipe) => favoriteRecipe.recipe_id === recipeId);
  }, [favoriteRecipes, recipeId]);

  const matchingPercentage = useMemo(() => {
    return (matchingRecipe.matching_elements_count / matchingRecipe.recipe.components_count) * 100;
  }, [matchingRecipe]);

  return (
    <RecipeCard
      recipe={matchingRecipe.recipe}
      action={
        <>
          <IconButton
            onClick={isRecipeFavorite
              ? handleRemoveFromFavorites()
              : handleAddToFavorites(matchingRecipe.recipe)}
          >
            {isRecipeFavorite
              ? <Favorite
                color="error" />
              : <FavoriteBorder
                color="error" />}
          </IconButton>
        </>
      }
      footer={
        progressBar
        ? <LinearProgressWithLabel value={matchingPercentage} />
        : undefined
      }
    />
  );
}
