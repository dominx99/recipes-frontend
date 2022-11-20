import { Category } from "../../categories/domain/Category";

export type Ingredient = {
  id: string;
  name: string;
  categories: Category[];
  selected: boolean;
}
