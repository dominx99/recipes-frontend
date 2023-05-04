import { Delete } from "@mui/icons-material";
import { Grid, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useAppDispatch } from "../../../shared/app/hooks";
import ConfirmationDialog from "../../../shared/components/Confirmation/ConfirmationDialog";
import LoadingSvg from "../../../shared/components/LoadingSvg";
import { Recipe } from "../../matching-recipes/domain/MatchingRecipe";
import RecipeCard from "../../recipes/components/RecipeCard";
import { removeRecipeAsync } from "../api/MyRecipesSlice";

interface Props {
  recipes: Recipe[];
  loadMoreCallback: (page: number) => void,
  isLoading?: boolean,
  hasMore: boolean,
}

const MyRecipeActions = ({ recipe }: { recipe: Recipe }) => {
  const dispatch = useAppDispatch();
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);

  const handleDelete = (recipeId: string, confirmed: boolean) => {
    setDeleteModalOpened(false);

    if (!confirmed) {
      return
    }

    dispatch(removeRecipeAsync(recipeId));
  }

  return (
    <>
      <ConfirmationDialog
        title={
          <Typography variant="inherit">
            Remove&nbsp;
            <Typography variant="inherit" component="span" color="secondary">{recipe.name}</Typography>
          </Typography>
        }
        body={
          <Typography>All ingredients in recipe will be removed too</Typography>
        }
        value={recipe.id}
        open={deleteModalOpened}
        onClose={handleDelete}
      />

      <IconButton
        aria-label="delete"
        onClick={() => setDeleteModalOpened(true)}
      >
        <Delete color="error" />
      </IconButton>
    </>
  )
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
            <RecipeCard recipe={recipe} action={<MyRecipeActions recipe={recipe} />} />
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  )
}
