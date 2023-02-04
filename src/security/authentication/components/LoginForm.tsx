import { FC, useState, KeyboardEvent } from "react"
import { Alert, Card, CardContent, CardHeader, FormGroup, Grid, Link, Stack, TextField, Typography } from "@mui/material"
import { authenticateAsync, AuthenticationCredentials, authenticationMessage } from "./../api/AuthenticationSlice"
import { Login } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import AuthenticationRouteList from "../../app/routes/AuthenticationRouteList";
import { useAppDispatch, useAppSelector } from "../../../shared/app/hooks";

interface Props {}

const LoginForm: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const message = useAppSelector(authenticationMessage);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<AuthenticationCredentials>({
    username: '',
    password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const authenticateHandler = async () => {
    setLoading(true);
    await dispatch(authenticateAsync(form));
    setLoading(false);
  }

  const handleLoginFormSubmitted = () => {
    authenticateHandler();
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.code !== 'Enter') {
      return;
    }

    authenticateHandler();
  }

  return (
    <Grid
      item
      padding={3}
      flexGrow={1}
      maxWidth={500}
      component="main"
    >
      <Card>
        <CardHeader
          title={<Typography variant="h4" variantMapping={{ h4: 'h1' }} textAlign="center">Login</Typography>}
        />
        <CardContent>
          <FormGroup>
            <TextField
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              name="username"
              id="login-name"
              label="Email"
              variant="outlined"
              margin={"normal"}
            />
            <TextField
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              name="password"
              id="login-password"
              label="Password"
              type="password"
              variant="outlined"
              margin={"normal"}
            />
          </FormGroup>

          { message ? (
            <Alert severity="error">{ message }</Alert>
          ) : ('') }

          <Stack
            direction="column"
            spacing={8}
            marginY={2}
          >
            <LoadingButton
              fullWidth
              variant="contained"
              onClick={handleLoginFormSubmitted}
              loading={loading}
            >
              <Stack direction="row" spacing={1}>
                <Typography>Login</Typography>
                <Login />
              </Stack>
            </LoadingButton>

            <Typography textAlign="center">
              No account yet?&nbsp;
              <Link href={AuthenticationRouteList.REGISTER}>Sign up</Link>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default LoginForm
