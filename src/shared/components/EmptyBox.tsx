import { SearchOff } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";

interface Props {
  title: string,
  height: string,
}

export default function EmptyBox({ title, height }: Props) {
  return (
    <Grid color={'primary.light'} container justifyContent={'center'} alignItems={'center'} textAlign={'center'} height={height}>
      <Grid item>
        <Typography variant="h3" component="h1" mb={8}>{title}</Typography>
        <SearchOff
          sx={{
            width: 200,
            height: 200,
          }}
        />
      </Grid>
    </Grid>
  )
}
