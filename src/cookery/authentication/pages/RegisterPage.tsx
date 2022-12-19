import { Grid } from '@mui/material';
import { FC } from 'react';
import { ThemeWrapper } from '../../../shared/components/ThemeWrapper';
import RegisterForm from '../components/RegisterForm';

interface Props {}

const RegisterPage: FC<Props> = () => {
  return (
    <ThemeWrapper>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <RegisterForm />
      </Grid>
    </ThemeWrapper>
  );
};

export default RegisterPage;
