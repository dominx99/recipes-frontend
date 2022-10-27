import { useEffect } from "react";
import Navbar from "../shared/components/Navbar";
import { useAppDispatch } from "./hooks";
import { fetchAllIngredientsAsync } from "./ingredients/api/IngredientsSlice";
import MatchingRecipeCards from "./matching-recipes/components/MatchingRecipeCards";

export default function MainPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllIngredientsAsync());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <MatchingRecipeCards
      />
    </>
  )
}
