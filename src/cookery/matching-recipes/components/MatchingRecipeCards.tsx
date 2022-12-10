import { Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchMatchingMatchingRecipesByIngredientsAsync, matchingRecipeSelectors, nextMatchingRecipesUrlSelector, selectFetchMatchingRecipesLoading } from "../api/MatchingRecipesSlice";
import MatchingRecipeCard from "./MatchingRecipeCard";
import InfiniteScroll from "react-infinite-scroller";
import { useCallback } from "react";
import { Ingredient } from "../../ingredients/domain/Ingredient";
import { selectAllIngredients } from "../../ingredients/api/IngredientsSlice";

interface Props {
}

export default function MatchingRecipeCards(props: Props) {
  const dispatch = useAppDispatch();
  const { ...other } = props;
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

  return (
    <InfiniteScroll
      pageStart={1}
      loader={<Typography key={0} color={'white'}>Loading ...</Typography>}
      hasMore={!!nextPageUrl}
      loadMore={loadMoreCallback}
      useWindow={true}
      initialLoad={false}
      threshold={300}
      useCapture={true}
    >
      <Grid container padding={2} {...other}>
        {matchingRecipes.map((matchingRecipe) => (
          <Grid key={matchingRecipe.recipe.id} item xs={12} sm={6} md={4} padding={1}>
            <MatchingRecipeCard recipe={matchingRecipe.recipe} />
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  )
}
