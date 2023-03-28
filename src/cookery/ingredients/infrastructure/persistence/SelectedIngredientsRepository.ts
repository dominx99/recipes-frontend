export function getSelectedIngredients() {
  const selectedIngredients = sessionStorage.getItem('cookery.ingredients.selected');
  if (selectedIngredients) {
    return JSON.parse(selectedIngredients);
  }
  return [];
}

export function saveSelectedIngredientId(id: string) {
  const selectedIngredients = getSelectedIngredients();

  if (selectedIngredients.includes(id)) {
    return;
  }

  const newSelectedIngredients = [...selectedIngredients, id];
  sessionStorage.setItem('cookery.ingredients.selected', JSON.stringify(newSelectedIngredients));
}

export function removeSelectedIngredientId(id: string) {
  const selectedIngredients = getSelectedIngredients();
  const newSelectedIngredients = selectedIngredients.filter((ingredientId: string) => ingredientId !== id);
  sessionStorage.setItem('cookery.ingredients.selected', JSON.stringify(newSelectedIngredients));
}
