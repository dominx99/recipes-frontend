import { Check, Close } from "@mui/icons-material";
import { Grid, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Recipe } from "../../../../cookery/matching-recipes/domain/MatchingRecipe";
import RecipeCard from "../../../../cookery/recipes/components/RecipeCard";
import { useAppDispatch } from "../../../../shared/app/hooks";
import ConfirmationDialog from "../../../../shared/components/Confirmation/ConfirmationDialog";
import LoadingSvg from "../../../../shared/components/LoadingSvg";
import { acceptRecipeRequestAsync, rejectRecipeRequestAsync } from "../api/PublishRecipeRequestsSlice";

interface Props {
  recipes: Recipe[];
  loadMoreCallback: (page: number) => void,
  isLoading?: boolean,
  hasMore: boolean,
}

const RecipeActions = ({ recipe }: { recipe: Recipe }) => {
  const dispatch = useAppDispatch();
  const [acceptRecipeConfirmationOpened, setAcceptRecipeConfirmationOpened] = useState(false);
  const [rejectRecipeConfirmationOpened, setRejectRecipeConfirmationOpened] = useState(false);

  const handleAcceptRecipe = (recipeId: string, confirmed: boolean) => {
    setAcceptRecipeConfirmationOpened(false);

    if (!confirmed) {
      return;
    }

    dispatch(acceptRecipeRequestAsync(recipeId));
  }

  const handleRejectRecipe = (recipeId: string, confirmed: boolean) => {
    setRejectRecipeConfirmationOpened(false);

    if (!confirmed) {
      return;
    }

    dispatch(rejectRecipeRequestAsync(recipeId));
  }

  return (
    <>
      <ConfirmationDialog
        title={
          <Typography variant="inherit">
            Accept&nbsp;
            <Typography variant="inherit" component="span" color="secondary">{recipe.name}</Typography>
          </Typography>
        }
        body={
          <Typography>This recipe will be visible for all users</Typography>
        }
        value={recipe.id}
        open={acceptRecipeConfirmationOpened}
        onClose={handleAcceptRecipe}
      />
      <ConfirmationDialog
        title={
          <Typography variant="inherit">
            Reject&nbsp;
            <Typography variant="inherit" component="span" color="secondary">{recipe.name}</Typography>
          </Typography>
        }
        body={
          <Typography>Are you sure you want to reject this request?</Typography>
        }
        value={recipe.id}
        open={rejectRecipeConfirmationOpened}
        onClose={handleRejectRecipe}
      />
      <IconButton
        aria-label="publish"
        onClick={() => setAcceptRecipeConfirmationOpened(true)}
      >
        <Check color="success" />
      </IconButton>
      <IconButton
        aria-label="edit"
        onClick={() => setRejectRecipeConfirmationOpened(true)}
      >
        <Close color="error" />
      </IconButton>
    </>
  )
}

export default function RequestedRecipesCards({ recipes, loadMoreCallback, isLoading, hasMore, ...other }: Props) {
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
            <RecipeCard recipe={recipe} action={<RecipeActions recipe={recipe} />} />
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  )
}
