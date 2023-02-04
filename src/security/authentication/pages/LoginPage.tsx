import { Grid } from '@mui/material';
import { FC } from 'react';
import LoginForm from '../components/LoginForm';

interface Props {}

const LoginPage: FC<Props> = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      flexGrow={1}
    >
      <LoginForm />
    </Grid>
  );
};

export default LoginPage;
