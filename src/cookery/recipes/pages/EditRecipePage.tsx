import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../shared/app/hooks";
import Navbar from "../../../shared/components/Navbar";
import Theme from "../../../shared/components/Theme";
import { fetchAllCategoriesWithIngredientsAsync } from "../../ingredients/api/IngredientsSlice";
import { fetchAllUnitsAsync } from "../../measures/api/MeasuresSlice";
import { fetchRecipeByIdAsync, recipeToEditSelector, resetAddRecipeErrors } from "../../my-recipes/api/MyRecipesSlice";
import MenuSidebar from "../../sidebar/components/MenuSidebar";
import Sidebar from "../../sidebar/components/Sidebar";
import RecipeForm from "../components/RecipeForm";

export default function EditRecipePage() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const recipe = useAppSelector(recipeToEditSelector);

  useEffect(() => {
    dispatch(resetAddRecipeErrors());
    dispatch(fetchAllCategoriesWithIngredientsAsync());
    dispatch(fetchAllUnitsAsync());
  }, [dispatch]);

  useEffect(() => {
    if (params.id === undefined) {
      return;
    }

    dispatch(fetchRecipeByIdAsync(params.id));
  }, [dispatch, params])

  return (
    <Theme>
      <Navbar />
      <MenuSidebar />
      <Sidebar />
      <RecipeForm recipe={recipe} />
    </Theme>
  )
}
