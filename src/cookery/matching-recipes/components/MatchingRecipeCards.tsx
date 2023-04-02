import { Grid, Typography } from "@mui/material";
import MatchingRecipeCard from "./MatchingRecipeCard";
import InfiniteScroll from "react-infinite-scroller";
import { MatchingRecipe } from "../domain/MatchingRecipe";

interface Props {
  matchingRecipes: MatchingRecipe[];
  loadMoreCallback: (page: number) => void,
  nextPageUrl: string | null,
}

export default function MatchingRecipeCards({ matchingRecipes, loadMoreCallback, nextPageUrl, ...other }: Props) {
  return (
    <InfiniteScroll
      pageStart={1}
      loader={<Typography key={0} color={'white'}>Loading ...</Typography>}
      hasMore={!!nextPageUrl}
      loadMore={loadMoreCallback}
      useWindow={true}
      initialLoad={false}
      threshold={1000}
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
