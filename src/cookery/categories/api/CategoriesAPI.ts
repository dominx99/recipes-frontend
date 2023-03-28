import { Ingredient } from '../../ingredients/domain/Ingredient';
import axios from './../../app/axios';

export interface CategoryResponse {
  id: string,
  name: string,
  products: Ingredient[],
}

export function fetchAllCategoriesWithIngredients() {
  return new Promise<{ data: CategoryResponse[] }>(async (resolve) => {
    const res = await axios().get('api/v1/categories-with-products');

    resolve(res);
  });
}
