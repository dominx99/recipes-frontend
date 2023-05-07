import { useEffect } from "react";
import { useAppDispatch } from "../../../shared/app/hooks";
import Navbar from "../../../shared/components/Navbar";
import Theme from "../../../shared/components/Theme";
import { fetchAllCategoriesWithIngredientsAsync } from "../../ingredients/api/IngredientsSlice";
import { fetchAllUnitsAsync } from "../../measures/api/MeasuresSlice";
import MenuSidebar from "../../sidebar/components/MenuSidebar";
import Sidebar from "../../sidebar/components/Sidebar";
import AddRecipeForm from "../components/AddRecipeForm";

export default function AddRecipePage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCategoriesWithIngredientsAsync());
    dispatch(fetchAllUnitsAsync());
  }, [dispatch]);

  return (
    <Theme>
      <Navbar />
      <MenuSidebar />
      <Sidebar />
      <AddRecipeForm />
    </Theme>
  )
}
