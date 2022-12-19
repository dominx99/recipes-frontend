import { LoadingButton } from "@mui/lab";
import { Card, CardContent, CardHeader, FormGroup, Grid, Link, Stack, TextField, Typography } from "@mui/material";
import { useState, KeyboardEvent, useEffect } from "react";
import { CreateUserForm } from "../../account/api/AccountForms";
import { addUserAsync, addUserErrorsGetter, addUserLoadingGetter, clearSuccessfullyCreatedUser, successfulyCreatedUserGetter } from "../../account/api/AccountSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import RouteList from "../../app/router/RouteList";
import { getValidationErrorFor, hasValidationErrorFor } from "../../shared/api/Errors";
import { createUserFormToAuthenticationCredentialsConverter } from "../api/AuthenticationForms";
import { authenticateAsync } from "../api/AuthenticationSlice";

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const addUserErrors = useAppSelector(addUserErrorsGetter);
  const successfulyCreatedUser = useAppSelector(successfulyCreatedUserGetter);
  const loading = useAppSelector(addUserLoadingGetter);

  const [form, setForm] = useState<CreateUserForm>({
    email: '',
    plain_password: '',
  });

  useEffect(() => {
    if (!successfulyCreatedUser) {
      return;
    }

    dispatch(authenticateAsync(createUserFormToAuthenticationCredentialsConverter(form)));
    dispatch(clearSuccessfullyCreatedUser());
  }, [dispatch, form, successfulyCreatedUser]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleRegisterUser = () => {
    dispatch(addUserAsync(form));
  }

  const handleSubmit = async () => {
    dispatch(addUserAsync(form));
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.code !== 'Enter') {
      return;
    }

    handleRegisterUser();
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
          title={<Typography variant="h4" variantMapping={{ h4: 'h1' }} textAlign="center">Register</Typography>}
        />
        <CardContent>
          <FormGroup>
            <TextField
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              name="email"
              id="register-name"
              label="Email"
              variant="outlined"
              margin={"normal"}
              helperText={getValidationErrorFor('email', addUserErrors)}
              error={hasValidationErrorFor('email', addUserErrors)}
            />
            <TextField
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              name="plain_password"
              id="register-password"
              label="Password"
              type="password"
              variant="outlined"
              margin={"normal"}
              helperText={getValidationErrorFor('plainPassword', addUserErrors)}
              error={hasValidationErrorFor('plainPassword', addUserErrors)}
            />
          </FormGroup>

          <Stack
            direction="column"
            spacing={8}
            marginY={2}
          >
            <LoadingButton
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              loading={loading}
            >
              <Typography>Register</Typography>
            </LoadingButton>

            <Typography textAlign="center">
              Already registered?&nbsp;
              <Link href={RouteList.AUTHENTICATE}>Sign in</Link>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  )
}
