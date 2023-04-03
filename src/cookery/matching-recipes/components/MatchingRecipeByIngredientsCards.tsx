import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/app/hooks";
import EmptyBox from "../../../shared/components/EmptyBox";
import { selectAllIngredients } from "../../ingredients/api/IngredientsSlice";
import { Ingredient } from "../../ingredients/domain/Ingredient";
import { fetchMatchingMatchingRecipesByIngredientsAsync, matchingRecipeSelectors, nextMatchingRecipesUrlSelector, selectFetchMatchingRecipesLoading } from "../api/MatchingRecipesSlice";
import MatchingRecipeCards from "./MatchingRecipeCards";

export default function MatchingRecipeByIngredientsCards() {
  const dispatch = useAppDispatch();
  const matchingRecipes = useAppSelector(matchingRecipeSelectors.selectAll);
  const ingredients: Ingredient[] = useAppSelector(selectAllIngredients);
  const fetchMatchingRecipesLoading = useAppSelector(selectFetchMatchingRecipesLoading);
  const nextPageUrl = useAppSelector(nextMatchingRecipesUrlSelector);

  const loadMoreCallback = useCallback((page: number) => {
    if (fetchMatchingRecipesLoading || !nextPageUrl) {
      return;
    }

    dispatch(fetchMatchingMatchingRecipesByIngredientsAsync({
      ingredients: ingredients.filter(ingredient => ingredient.selected).map(ingredient => ingredient.name),
      next_page_url: nextPageUrl
    }));
  }, [dispatch, ingredients, fetchMatchingRecipesLoading, nextPageUrl]);

  if (matchingRecipes.length <= 0) {
    return (
      <EmptyBox
        height="75vh"
        title={'No matching recipes found :('}
      />
    )
  }

  return (
    <MatchingRecipeCards
      matchingRecipes={matchingRecipes}
      loadMoreCallback={loadMoreCallback}
      nextPageUrl={nextPageUrl}
    />
  )
}
