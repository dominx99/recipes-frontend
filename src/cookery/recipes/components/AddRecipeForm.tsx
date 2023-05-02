import { Add, Close } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Card, CardContent, CardHeader, Divider, FormControl, FormGroup, Grid, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAppSelector } from "../../../shared/app/hooks";
import { unitsSelector } from "../../measures/api/MeasuresSlice";

interface IAddRecipeForm {
  name: string;
  components: {
    name: string;
    unit: string;
    quantity: number;
  }[];
}

export default function AddRecipeForm() {
  const units = useAppSelector(unitsSelector);

  const [form, setForm] = useState<IAddRecipeForm>({
    name: '',
    components: [{
      name: '',
      unit: '',
      quantity: 0,
    }],
  });

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

  const handleKeyPress = () => { };
  const handleSubmit = () => { };

  const addComponentTemplate = () => {
    setForm({
      ...form,
      components: [
        ...form.components,
        {
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
                onKeyPress={handleKeyPress}
                name="name"
                id="recipe-name"
                label="Name"
                variant="filled"
                margin={"normal"}
              />

              <Divider sx={{ marginTop: 3, marginBottom: 3 }} />
              <Typography>Components</Typography>

              {form.components.map((component, index) => (
                <Stack mt={2} key={index} direction="row" justifyContent="center" alignItems="center">
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        onChange={event => handleComponentChange(event, index)}
                        onKeyPress={handleKeyPress}
                        name="name"
                        id="component-name"
                        label="Name"
                        variant="filled"
                        value={component.name}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl variant="filled" fullWidth>
                        <InputLabel id="component-unit-label">Unit</InputLabel>
                        <Select
                          onChange={event => handleComponentChange(event, index)}
                          labelId="component-unit-label"
                          id="component-unit"
                          name="unit"
                          label="unit"
                          value={component.unit}
                        >
                          {units.map((unit, index) => (
                            <MenuItem key={index} value={unit}>{unit}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        onChange={event => handleComponentChange(event, index)}
                        onKeyPress={handleKeyPress}
                        name="quantity"
                        id="component-quantity"
                        label="Quantity"
                        variant="filled"
                        value={component.quantity}
                      />
                    </Grid>
                  </Grid>
                  <Box>
                    <IconButton color="error" onClick={() => removeComponentTemplate(index)}>
                      <Close />
                    </IconButton>
                  </Box>
                </Stack>
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
