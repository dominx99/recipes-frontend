import { SearchOff } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { ReactElement } from "react";

interface Props {
  title: ReactElement<any, any>,
  subtitle?: ReactElement<any, any>,
  height: string,
  emptyIconDisplayed?: boolean,
}

export default function EmptyBox({ title, subtitle, height, emptyIconDisplayed = true }: Props) {
  return (
    <Grid color={'primary.light'} container justifyContent={'center'} alignItems={'center'} textAlign={'center'} height={height}>
      <Grid item>
        {title !== undefined && title}
        {subtitle !== undefined && subtitle}
        {emptyIconDisplayed && (
          <SearchOff
            sx={{
              width: 200,
              height: 200,
            }}
          />
        )}
      </Grid>
    </Grid>
  )
}
