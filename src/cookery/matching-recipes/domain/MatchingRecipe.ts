import { RecipeComponent } from "../../recipe-components/domain/RecipeComponent";

export interface Recipe {
  id: string;
  name: string;
  components: RecipeComponent[];
}

export interface MatchingRecipe {
  recipe: Recipe,
  matching_ingredients_count: number,
}
