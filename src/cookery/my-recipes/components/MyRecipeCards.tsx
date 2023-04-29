import { Grid } from "@mui/material";
import InfiniteScroll from "react-infinite-scroller";
import LoadingSvg from "../../../shared/components/LoadingSvg";
import { Recipe } from "../../matching-recipes/domain/MatchingRecipe";
import RecipeCard from "../../recipes/components/RecipeCard";

interface Props {
  recipes: Recipe[];
  loadMoreCallback: (page: number) => void,
  isLoading?: boolean,
  hasMore: boolean,
}

export default function MyRecipeCards({ recipes, loadMoreCallback, isLoading, hasMore, ...other }: Props) {
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
        {recipes.map(recipe => (
          <Grid key={recipe.id} item xs={12} sm={6} md={4} padding={1}>
            <RecipeCard recipe={recipe} action={<></>} />
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  )
}
