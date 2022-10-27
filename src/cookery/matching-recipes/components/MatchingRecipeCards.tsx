import { Button, Card, CardActions, CardContent, CardMedia, Grid, List, ListItem, Typography } from "@mui/material";
import { useAppSelector } from "../../hooks";
import { RecipeComponent } from "../../recipe-components/domain/RecipeComponent";
import { matchingRecipeSelectors } from "../api/MatchingRecipesSlice";

interface Props {
}

export default function MatchingRecipeCards(props: Props) {
  const { ...other } = props;
  const matchingRecipes = useAppSelector(matchingRecipeSelectors.selectAll);

  return (
    <Grid container padding={2} {...other}>
      {matchingRecipes.map((matchingRecipe) => (
        <Grid key={matchingRecipe.recipe.id} item xs={12} sm={6} md={4} padding={1}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {matchingRecipe.recipe.name}
              </Typography>
              <List>
                {matchingRecipe.recipe.components.map((component: RecipeComponent) => (
                  <ListItem key={component.ingredient.id}>
                    {component.ingredient.name} ({component.measure?.formatted_quantity} {component.measure?.unit?.name})
                  </ListItem>
                ))}
              </List>
            </CardContent>
            <CardActions>
              <Button size="small">View</Button>
              <Button size="small">Edit</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
