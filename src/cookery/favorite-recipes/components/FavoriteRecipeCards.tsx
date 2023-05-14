import { Search } from "@mui/icons-material";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Fragment, useCallback } from "react";
import { Link as RouteLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../shared/app/hooks";
import EmptyBox from "../../../shared/components/EmptyBox";
import CookeryRouteList from "../../app/router/CookeryRouteList";
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

  if (matchingFavoriteRecipes.length <= 0) {
    return (
      <EmptyBox
        height="75vh"
        title={
          <Typography variant="h3" component="h1" mb={4}>No mathcing recipes found :(</Typography>
        }
        emptyIconDisplayed={false}
        subtitle={
          <Box>
            <Typography variant="h4" component="h2" mb={4}>Try to add recipes to your favorites</Typography>
            <Button component={RouteLink} to={CookeryRouteList.HOME} color="primary" variant="contained" sx={{ marginBottom: 8 }}>
              Search Recipes <Search />
            </Button>
          </Box>
        }
      />
    )
  }

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
