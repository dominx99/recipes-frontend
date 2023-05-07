import { useEffect } from "react";
import { useAppDispatch } from "../../../shared/app/hooks";
import Navbar from "../../../shared/components/Navbar";
import Theme from "../../../shared/components/Theme";
import { fetchAllCategoriesWithIngredientsAsync } from "../../ingredients/api/IngredientsSlice";
import MenuSidebar from "../../sidebar/components/MenuSidebar";
import Sidebar from "../../sidebar/components/Sidebar";
import { fetchAllFavoriteRecipesAsync, fetchAllMatchingFavoriteRecipesAsync } from "../api/FavoriteRecipesSlice";
import FavoriteRecipeCards from "../components/FavoriteRecipeCards";

export default function FavoriteRecipesPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCategoriesWithIngredientsAsync());
    dispatch(fetchAllFavoriteRecipesAsync());
    dispatch(fetchAllMatchingFavoriteRecipesAsync(1));
  }, [dispatch]);

  return (
    <Theme>
      <Navbar />
      <MenuSidebar />
      <Sidebar />
      <FavoriteRecipeCards />
    </Theme>
  )
}
