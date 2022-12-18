import { useEffect } from "react";
import Navbar from "../../../shared/components/Navbar";
import { useAppDispatch } from "../../app/hooks";
import { fetchAllCategoriesWithIngredientsAsync } from "../../ingredients/api/IngredientsSlice";
import MatchingRecipeCards from "../../matching-recipes/components/MatchingRecipeCards";
import Sidebar from "../../sidebar/components/Sidebar";

export default function HomePage() {
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
