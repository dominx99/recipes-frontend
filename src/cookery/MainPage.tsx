import { useEffect } from "react";
import Navbar from "../shared/components/Navbar";
import { useAppDispatch } from "./hooks";
import { fetchAllCategoriesWithIngredientsAsync } from "./ingredients/api/IngredientsSlice";
import MatchingRecipeCards from "./matching-recipes/components/MatchingRecipeCards";
import Sidebar from "./sidebar/components/Sidebar";

export default function MainPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCategoriesWithIngredientsAsync());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Sidebar />
      <MatchingRecipeCards />
    </>
  )
}
