import { useState } from 'react'
import './NumericOption.css'

function NumericOption({
    id,
    label,
    initialValue,
    update,
    titleAtr = undefined,
    maxValue = undefined,
    minValue = undefined,
    step = undefined }:
    {
        id : string,
        label: string,
        initialValue: number,
        update: (value: number) => void,
        titleAtr: string | undefined,
        maxValue: number | undefined,
        minValue: number | undefined,
        step: number | undefined
    }) : JSX.Element
{

    const [value, setValue] = useState(initialValue);

    function handleValueChange(e: React.ChangeEvent<HTMLInputElement>): void {

        let parsed = parseFloat(e.target.value)
        parsed = clampNumber(parsed, minValue, maxValue)

        setValue(parsed);
        update(parsed);
    }

    function clampNumber(number: number, rangeFrom?: number, rangeTo?: number): number {

        if (rangeFrom != undefined) {

            if (number < rangeFrom) {

                return rangeFrom;
            }
        }

        if (rangeTo != undefined) {

            if (number > rangeTo) {

                return rangeTo;
            }
        }

        return number;
    }

    return (
        <div title={titleAtr}>
        <label htmlFor={id}>{label}: </label>
        <input
              className="numericOption"
              type="number"
              id={id}
              min={minValue}
              max={maxValue}
              step={step}
              value={clampNumber(value, minValue, maxValue)}
              onChange={e => handleValueChange(e)}
        />
    </div>
  );
}

export default NumericOption;