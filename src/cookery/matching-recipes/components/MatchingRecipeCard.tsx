import { Card, CardContent, List, ListItem, Typography } from "@mui/material";
import { RecipeComponent } from "../../recipe-components/domain/RecipeComponent";
import { Recipe } from "../domain/MatchingRecipe";

interface MatchingRecipeCardProps {
  recipe: Recipe;
}

export default function MatchingRecipeCard({ recipe }: MatchingRecipeCardProps) {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {recipe.name}
        </Typography>
        <List>
          {recipe.components.map((component: RecipeComponent) => (
            <ListItem key={component.id}>
              {component.ingredient.name} ({component.measure?.formatted_quantity} {component.measure?.unit?.name})
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
