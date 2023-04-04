import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/app/hooks";
import MatchingRecipeCards from "../../matching-recipes/components/MatchingRecipeCards";
import { fetchAllMatchingFavoriteRecipesAsync, matchingFavoriteRecipesSelectors, selectFavoriteMatchingRecipesLoading, selectNextPageMatchingFavoriteRecipesUrl } from "../api/FavoriteRecipesSlice";

export default function FavoriteRecipeCards() {
  const dispatch = useAppDispatch();

  const matchingFavoriteRecipes = useAppSelector(matchingFavoriteRecipesSelectors.selectAll);
  const nextPageUrl = useAppSelector(selectNextPageMatchingFavoriteRecipesUrl);
  const fetchMatchingRecipesLoading = useAppSelector(selectFavoriteMatchingRecipesLoading);

  const loadMoreCallback = useCallback(() => {
    if (fetchMatchingRecipesLoading || !nextPageUrl) {
      return;
    }

    dispatch(fetchAllMatchingFavoriteRecipesAsync(nextPageUrl));
  }, [dispatch, fetchMatchingRecipesLoading, nextPageUrl]);

  return (
    <MatchingRecipeCards
      matchingRecipes={matchingFavoriteRecipes}
      loadMoreCallback={loadMoreCallback}
      nextPageUrl={nextPageUrl}
    />
  )
}
