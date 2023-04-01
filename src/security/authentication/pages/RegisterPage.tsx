import { Grid } from '@mui/material';
import { FC } from 'react';
import Theme from '../../../shared/components/Theme';
import { ThemeWrapper } from '../../../shared/components/ThemeWrapper';
import RegisterForm from '../components/RegisterForm';

interface Props {}

const RegisterPage: FC<Props> = () => {
  return (
    <Theme>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <RegisterForm />
      </Grid>
    </Theme>
  );
};

export default RegisterPage;
