import { Delete, Edit, Publish } from "@mui/icons-material";
import { Box, Button, Chip, Grid, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../shared/app/hooks";
import ConfirmationDialog from "../../../shared/components/Confirmation/ConfirmationDialog";
import EmptyBox from "../../../shared/components/EmptyBox";
import LoadingSvg from "../../../shared/components/LoadingSvg";
import CookeryRouteList from "../../app/router/CookeryRouteList";
import { Recipe } from "../../matching-recipes/domain/MatchingRecipe";
import RecipeCard from "../../recipes/components/RecipeCard";
import { publishRecipeAsync, removeRecipeAsync } from "../api/MyRecipesSlice";

interface Props {
  recipes: Recipe[];
  loadMoreCallback: (page: number) => void,
  isLoading?: boolean,
  hasMore: boolean,
}

const PublishedChip = () => (
  <Chip label="published" color="secondary" />
)

const MyRecipeActions = ({ recipe }: { recipe: Recipe }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [publishConfirmationOpened, setPublishConfirmationOpened] = useState(false);

  const handleDelete = (recipeId: string, confirmed: boolean) => {
    setDeleteModalOpened(false);

    if (!confirmed) {
      return
    }

    dispatch(removeRecipeAsync(recipeId));
  }

  const handlePublish = () => {
    setPublishConfirmationOpened(false);

    dispatch(publishRecipeAsync(recipe.id));
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
      <ConfirmationDialog
        title={
          <Typography variant="inherit">
            Publish&nbsp;
            <Typography variant="inherit" component="span" color="secondary">{recipe.name}</Typography>
          </Typography>
        }
        body={
          <Typography>Are you sure you want to publish this recipe to all users?</Typography>
        }
        value={recipe.id}
        open={publishConfirmationOpened}
        onClose={handlePublish}
      />

      {!recipe.published && (
        <IconButton
          aria-label="publish"
          onClick={() => setPublishConfirmationOpened(true)}
        >
          <Publish color="secondary" />
        </IconButton>
      )}
      <IconButton
        aria-label="edit"
        onClick={() => navigate(`/edit-recipe/${recipe.id}`)}
      >
        <Edit color="primary" />
      </IconButton>
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
  if (recipes.length <= 0) {
    return (
      <EmptyBox
        height="75vh"
        title={
          <Typography variant="h3" component="h1" mb={4}>You didn't create any recipe yet</Typography>
        }
        subtitle={
          <Box>
            <Button component={Link} to={CookeryRouteList.ADD_RECIPE} color="primary" variant="contained" sx={{ marginBottom: 8 }}>
              Add recipe
            </Button>
          </Box>
        }
        emptyIconDisplayed={false}
      />
    )
  }
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
            <RecipeCard
              recipe={recipe}
              action={<MyRecipeActions recipe={recipe} />}
              footer={recipe.published ? <PublishedChip /> : undefined}
            />
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  )
}
