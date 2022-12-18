import { Measure as MeasureDomain } from "../domain/Measure";

interface MeasureProps {
  measure: MeasureDomain | null,
}

export default function Measure({ measure }: MeasureProps) {
  const quantity = () => measure?.formatted_quantity || '';
  const unitName = () => {
    if (measure?.unit?.name === 'NONE' || !measure?.unit?.name) {
      return '';
    }

    return measure?.unit?.value;
  }

  return (
    <>
      {quantity() + ' ' + unitName()}
    </>
  );
}
