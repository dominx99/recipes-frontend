import { useEffect } from "react";
import { useAppDispatch } from "../../../shared/app/hooks";
import Navbar from "../../../shared/components/Navbar";
import Theme from "../../../shared/components/Theme";
import { fetchAllCategoriesWithIngredientsAsync } from "../../ingredients/api/IngredientsSlice";
import Sidebar from "../../sidebar/components/Sidebar";
import AddRecipeForm from "../components/AddRecipeForm";

export default function AddRecipePage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCategoriesWithIngredientsAsync());
  }, [dispatch]);

  return (
    <Theme>
      <Navbar />
      <Sidebar />
      <AddRecipeForm />
    </Theme>
  )
}
