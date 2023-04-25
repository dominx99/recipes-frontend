import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/app/hooks";
import MatchingRecipeCards from "../../matching-recipes/components/MatchingRecipeCards";
import { favoriteMatchingRecipesHasNextPageSelector, favoriteMatchingRecipesPageSelector, fetchAllMatchingFavoriteRecipesAsync, matchingFavoriteRecipesSelectors, selectFavoriteMatchingRecipesLoading } from "../api/FavoriteRecipesSlice";

export default function FavoriteRecipeCards() {
  const dispatch = useAppDispatch();

  const matchingFavoriteRecipes = useAppSelector(matchingFavoriteRecipesSelectors.selectAll);
  const fetchMatchingRecipesLoading = useAppSelector(selectFavoriteMatchingRecipesLoading);
  const page = useAppSelector(favoriteMatchingRecipesPageSelector);
  const hasNextPage = useAppSelector(favoriteMatchingRecipesHasNextPageSelector);

  const loadMoreCallback = useCallback(() => {
    if (fetchMatchingRecipesLoading || !hasNextPage) {
      return;
    }

    dispatch(fetchAllMatchingFavoriteRecipesAsync(page + 1));
  }, [dispatch, fetchMatchingRecipesLoading, page, hasNextPage]);

  return (
    <MatchingRecipeCards
      matchingRecipes={matchingFavoriteRecipes}
      loadMoreCallback={loadMoreCallback}
      isLoading={fetchMatchingRecipesLoading}
      hasMore={hasNextPage}
      progressBar={false}
    />
  )
}
