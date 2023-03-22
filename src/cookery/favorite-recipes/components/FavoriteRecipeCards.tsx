import { useAppSelector } from "../../../shared/app/hooks";
import MatchingRecipeCards from "../../matching-recipes/components/MatchingRecipeCards";
import { matchingFavoriteRecipesSelectors } from "../api/FavoriteRecipesSlice";

export default function FavoriteRecipeCards() {
  const matchingFavoriteRecipes = useAppSelector(matchingFavoriteRecipesSelectors.selectAll);

  return (
    <>
      <MatchingRecipeCards
        matchingRecipes={matchingFavoriteRecipes}
        loadMoreCallback={() => {}}
        nextPageUrl={''}
      />
    </>
  )
}
