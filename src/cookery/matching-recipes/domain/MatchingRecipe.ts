import { RecipeComponent } from "../../recipe-components/domain/RecipeComponent";

export interface Recipe {
  id: string;
  name: string;
  components: RecipeComponent[];
  components_count: number;
}

export interface MatchingRecipe {
  recipe: Recipe,
  matching_elements_count: number,
}
