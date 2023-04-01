import { Grid } from '@mui/material';
import { FC } from 'react';
import Theme from '../../../shared/components/Theme';
import LoginForm from '../components/LoginForm';

interface Props { }

const LoginPage: FC<Props> = () => {
  return (
    <Theme>
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
    </Theme>
  );
};

export default LoginPage;
