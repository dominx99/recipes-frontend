import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/app/hooks";
import EmptyBox from "../../../shared/components/EmptyBox";
import { selectAllIngredients } from "../../ingredients/api/IngredientsSlice";
import { Ingredient } from "../../ingredients/domain/Ingredient";
import { fetchMatchingMatchingRecipesByIngredientsAsync, matchingRecipesCurrentPageSelector, matchingRecipeSelectors, matchingRecipesHasNextPageSelector, selectFetchMatchingRecipesLoading } from "../api/MatchingRecipesSlice";
import MatchingRecipeCards from "./MatchingRecipeCards";

export default function MatchingRecipeByIngredientsCards() {
  const dispatch = useAppDispatch();
  const matchingRecipes = useAppSelector(matchingRecipeSelectors.selectAll);
  const ingredients: Ingredient[] = useAppSelector(selectAllIngredients);
  const fetchMatchingRecipesLoading = useAppSelector(selectFetchMatchingRecipesLoading);
  const currentPage = useAppSelector(matchingRecipesCurrentPageSelector);
  const hasNextPage = useAppSelector(matchingRecipesHasNextPageSelector);

  const loadMoreCallback = useCallback(() => {
    if (fetchMatchingRecipesLoading || !hasNextPage) {
      return;
    }

    dispatch(fetchMatchingMatchingRecipesByIngredientsAsync({
      ingredients: ingredients.filter(ingredient => ingredient.selected).map(ingredient => ingredient.name),
      page: currentPage + 1,
    }));
  }, [dispatch, ingredients, fetchMatchingRecipesLoading, currentPage, hasNextPage]);

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
      isLoading={fetchMatchingRecipesLoading}
      hasMore={hasNextPage}
    />
  )
}
