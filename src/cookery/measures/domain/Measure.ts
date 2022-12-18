export interface Measure {
  numeric_quantity: number | null;
  formatted_quantity: string | null;
  unit: {
    name: string;
    value: string;
  } | null
}
