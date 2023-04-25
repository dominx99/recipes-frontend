import { Grid } from "@mui/material";
import MatchingRecipeCard from "./MatchingRecipeCard";
import InfiniteScroll from "react-infinite-scroller";
import { MatchingRecipe } from "../domain/MatchingRecipe";
import LoadingSvg from "../../../shared/components/LoadingSvg";

interface Props {
  matchingRecipes: MatchingRecipe[];
  loadMoreCallback: (page: number) => void,
  isLoading?: boolean,
  hasMore: boolean,
  progressBar: boolean,
}

export default function MatchingRecipeCards({ matchingRecipes, loadMoreCallback, isLoading, hasMore, progressBar, ...other }: Props) {
  return (
    <InfiniteScroll
      pageStart={1}
      loader={
        isLoading
          ? <Grid key={1} display="flex" justifyContent={'center'} alignItems={'center'} width={'100%'}>
            <LoadingSvg />
          </Grid>
          : undefined
      }
      hasMore={hasMore}
      loadMore={loadMoreCallback}
      useWindow={true}
      initialLoad={false}
      threshold={1000}
      useCapture={true}
    >
      <Grid container padding={2} {...other}>
        {matchingRecipes.map((matchingRecipe) => (
          <Grid key={matchingRecipe.recipe.id} item xs={12} sm={6} md={4} padding={1}>
            <MatchingRecipeCard matchingRecipe={matchingRecipe} progressBar={progressBar} />
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  )
}
