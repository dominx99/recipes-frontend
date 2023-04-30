import { Add } from "@mui/icons-material";
import { Fab, Zoom } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import CookeryRouteList from "../../app/router/CookeryRouteList";

export default function AddRecipeFloatingbutton() {
  return (
    <Zoom in={true} timeout={500}>
      <Fab
        component={RouterLink}
        to={CookeryRouteList.ADD_RECIPE}
        color="primary"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
      >
        <Add />
      </Fab>
    </Zoom>
  )
}
