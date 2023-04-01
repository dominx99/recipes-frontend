import { useEffect } from "react";
import { useAppDispatch } from "../../../shared/app/hooks";
import Navbar from "../../../shared/components/Navbar";
import Theme from "../../../shared/components/Theme";
import { fetchAllCategoriesWithIngredientsAsync } from "../../ingredients/api/IngredientsSlice";
import Sidebar from "../../sidebar/components/Sidebar";
import { fetchAllFavoriteRecipesAsync, fetchAllMatchingFavoriteRecipesAsync } from "../api/FavoriteRecipesSlice";
import FavoriteRecipeCards from "../components/FavoriteRecipeCards";

export default function FavoriteRecipesPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCategoriesWithIngredientsAsync());
    dispatch(fetchAllFavoriteRecipesAsync());
    dispatch(fetchAllMatchingFavoriteRecipesAsync());
  }, [dispatch]);

  return (
    <Theme>
      <Navbar />
      <Sidebar />
      <FavoriteRecipeCards />
    </Theme>
  )
}
