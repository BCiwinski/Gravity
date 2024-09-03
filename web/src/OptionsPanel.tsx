import { useState } from 'react'
import './OptionsPanel.css'

function OptionsPanel({
    initialGravitationScale,
    updateGravitationScale,
    initialGravitationMax,
    updateGravitationMax,
    initialVelocityScale,
    updateVelocityScale,
    clearHandler}:
    {
        initialGravitationScale: number,
        updateGravitationScale: (value: number) => void,
        initialGravitationMax : number
        updateGravitationMax: (value: number) => void,
        initialVelocityScale: number
        updateVelocityScale: (value: number) => void,
        clearHandler: () => void
    }): JSX.Element
{

    const [gravitationScale, setGravitationScale] = useState(initialGravitationScale);

    const gravitationScaleMax = 10000, gravitationScaleMin = 0;

    const [gravitationMax, setGravitationMax] = useState(initialGravitationMax);

    const gravitationMaxMax = 1, gravitationMaxMin = 0.0001;

    const [velocityScale, setVelocityScale] = useState(initialVelocityScale);

    const velocityScaleMax = 1, velocityScaleMin = 0.0001;

    function handleGravitationScaleChange(e: React.ChangeEvent<HTMLInputElement>): void {

        let parsed = parseInt(e.target.value)

        if (numberIsWithin(parsed, gravitationScaleMin, gravitationScaleMax)) {

            setGravitationScale(parsed);
            updateGravitationScale(parsed);
        }
    }

    function handleGravitationMaxChange(e: React.ChangeEvent<HTMLInputElement>): void {

        let parsed = parseFloat(e.target.value)

        if (numberIsWithin(parsed, gravitationMaxMin, gravitationMaxMax)) {

            setGravitationMax(parsed);
            updateGravitationMax(parsed);
        }
    }

    function handleVelocityScaleChange(e: React.ChangeEvent<HTMLInputElement>): void {

        let parsed = parseFloat(e.target.value)

        if (numberIsWithin(parsed, velocityScaleMin, velocityScaleMax)) {

            setVelocityScale(parsed);
            updateVelocityScale(parsed);
        }
    }

    function numberIsWithin(number: number, rangeFrom: number, rangeTo: number): boolean {

        if (Number.isNaN(number)) {

            return false;
        }

        if (number < rangeFrom) {

            return false;
        }

        if (number > rangeTo) {

            return false;
        }

        return true;
    }

    return (
        <div className="optionsPanel">
            <h2>Options</h2>
            <div className="options">
                <label htmlFor="gravitationScaleInput">Gravitation strength: </label>
                <input
                    className="options"
                    type="number"
                    id="gravitationScaleInput"
                    name="gravitationScale"
                    min={gravitationScaleMin}
                    max={gravitationScaleMax}
                    step="10"
                    value={gravitationScale}
                    onChange={e => handleGravitationScaleChange(e)}
                />
                <br/>
                <label htmlFor="gravitationMaxInput">Gravitation max force: </label>
                <input
                    className="options"
                    type="number"
                    id="gravitationMaxInput"
                    name="gravitationMax"
                    min={gravitationMaxMin}
                    max={gravitationMaxMax}
                    step="0.0001"
                    value={gravitationMax}
                    onChange={e => handleGravitationMaxChange(e)}
                />
                <br/>
                <label htmlFor="velocityScaleInput">Velocity: </label>
                <input
                    className="options"
                    type="number"
                    id="velocityScaleInput"
                    name="velocityScale"
                    min={velocityScaleMin}
                    max={velocityScaleMax}
                    step="0.0001"
                    value={velocityScale}
                    onChange={e => handleVelocityScaleChange(e)}
                />
            </div>
            <input type="button" className="options" value="Clear stars" onClick={() => clearHandler()} />
        </div>
  );
}

export default OptionsPanel;