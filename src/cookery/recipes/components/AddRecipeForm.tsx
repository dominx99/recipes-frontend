import { Add, Close } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Card, CardContent, CardHeader, Divider, FormControl, FormGroup, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../shared/app/hooks";
import { Recipe } from "../../matching-recipes/domain/MatchingRecipe";
import { unitsSelector } from "../../measures/api/MeasuresSlice";
import { addRecipeAsync, addRecipeErrorsSelector, updateRecipeAsync } from "../../my-recipes/api/MyRecipesSlice";

export interface IRecipeForm {
  id: string | undefined,
  name: string;
  components: IRecipeComponentForm[];
}

export interface IRecipeComponentForm {
  id: string | undefined,
  name: string;
  unit: string;
  quantity: number;
}

interface Props {
  recipe?: Recipe;
}

const convertRecipeToForm = (recipe: Recipe): IRecipeForm => {
  return {
    id: recipe.id,
    name: recipe.name,
    components: recipe.components.map(component => ({
      id: component.id,
      name: component.ingredient.name,
      unit: component?.measure?.unit?.value || '',
      quantity: component?.measure?.numeric_quantity || 0,
    })),
  }
}

export default function AddRecipeForm({ recipe }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const units = useAppSelector(unitsSelector);
  const errors = useAppSelector(addRecipeErrorsSelector);

  const defaultState = {
    id: undefined,
    name: '',
    components: [{
      id: undefined,
      name: '',
      unit: '',
      quantity: 0,
    }],
  }

  const [form, setForm] = useState<IRecipeForm>(defaultState);

  useEffect(() => {
    if (recipe === undefined) {
      return;
    }

    setForm(convertRecipeToForm(recipe));
  }, [recipe])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleComponentChange = (event: SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    let component = form.components[index];

    component = {
      ...component,
      [event.target.name]: event.target.value,
    };

    form.components[index] = component;

    setForm({
      ...form,
    });
  }

  const hasErrorFor = (field: string): boolean => {
    if (errors === undefined || errors[field] === undefined) {
      return false;
    }

    return errors[field] !== undefined;
  }

  const getErrorFor = (field: string): string => {
    if (errors === undefined || !hasErrorFor(field)) {
      return ''
    }

    return errors[field];
  }

  const handleSubmit = () => {
    if (form.id !== undefined) {
      dispatch(updateRecipeAsync(form))
        .then(() => navigate('/my-recipes'))

      return;
    }

    dispatch(addRecipeAsync(form))
      .then(() => navigate('/my-recipes'))
  };

  const addComponentTemplate = () => {
    setForm({
      ...form,
      components: [
        ...form.components,
        {
          id: undefined,
          name: '',
          unit: '',
          quantity: 0,
        },
      ],
    });
  }

  const removeComponentTemplate = (index: number) => {
    setForm({
      ...form,
      components: form.components.filter((_, i) => i !== index),
    });
  }

  return (
    <Grid
      direction="row"
      justifyContent="center"
      alignItems="center"
      flexGrow={1}
      container
      padding={2}
    >
      <Grid item xs={12} md={8}>
        <Card>
          <CardHeader
            title={<Typography variant="h4" variantMapping={{ h4: 'h1' }}>Add recipe</Typography>}
          />
          <CardContent>
            <FormGroup>
              <TextField
                onChange={handleChange}
                name="name"
                id="recipe-name"
                label="Name"
                variant="filled"
                margin={"normal"}
                error={hasErrorFor('name')}
                helperText={getErrorFor('name')}
                value={form.name}
              />

              <Divider sx={{ marginTop: 3, marginBottom: 3 }} />
              <Typography>Components</Typography>

              {form.components.map((component, index) => (
                <Fragment key={index}>
                  <Stack mt={2} direction="row" justifyContent="center" alignItems="center">
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <TextField
                          fullWidth
                          onChange={event => handleComponentChange(event, index)}
                          name="name"
                          id="component-name"
                          label="Name"
                          variant="filled"
                          value={component.name}
                          error={hasErrorFor(`components.${index}.name`)}
                          helperText={getErrorFor(`components.${index}.name`)}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl variant="filled" fullWidth>
                          <InputLabel error={hasErrorFor(`components.${index}.unit`)} id={`component-unit-${index}-label`}>Unit</InputLabel>
                          <Select
                            onChange={event => handleComponentChange(event, index)}
                            labelId={`component-unit-${index}-label`}
                            id="component-unit"
                            name="unit"
                            label="unit"
                            value={component.unit}
                            error={hasErrorFor(`components.${index}.unit`)}
                            aria-describedby={`component-unit-${index}-helper-text`}
                            defaultValue={component.unit}
                          >
                            {units.map((unit, index) => (
                              <MenuItem key={index} value={unit}>{unit}</MenuItem>
                            ))}
                          </Select>
                          <FormHelperText
                            id={`component-unit-${index}-helper-text`}
                            error={hasErrorFor(`components.${index}.unit`)}
                          >{getErrorFor(`components.${index}.unit`)}</FormHelperText>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          fullWidth
                          onChange={event => handleComponentChange(event, index)}
                          name="quantity"
                          id="component-quantity"
                          label="Quantity"
                          variant="filled"
                          value={component.quantity}
                          error={hasErrorFor(`components.${index}.quantity`)}
                          helperText={getErrorFor(`components.${index}.quantity`)}
                        />
                      </Grid>
                    </Grid>
                    <Box>
                      <IconButton color="error" onClick={() => removeComponentTemplate(index)}>
                        <Close />
                      </IconButton>
                    </Box>
                  </Stack>
                  {(index !== form.components.length - 1) && <Divider sx={{ marginTop: 3, marginBottom: 1 }} />}
                </Fragment>
              ))}
            </FormGroup>
            <Stack mt={2}>
              <Button color="secondary" onClick={addComponentTemplate}>
                <Add />
              </Button>
            </Stack>

            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-end"
              mt={3}
            >
              <LoadingButton
                variant="contained"
                onClick={handleSubmit}
                loading={false}
              >
                Add recipe
              </LoadingButton>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
