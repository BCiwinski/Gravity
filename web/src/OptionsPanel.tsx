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

    const [, setGravitationScale] = useState(initialGravitationScale);

    const [, setGravitationMax] = useState(initialGravitationMax);

    const [, setVelocityScale] = useState(initialVelocityScale);

    function handleGravitationScaleChange(e: React.ChangeEvent<HTMLInputElement>): void {

        let parsed = parseInt(e.target.value)
        setGravitationScale(parsed);

        updateGravitationScale(parsed);
    }

    function handleGravitationMaxChange(e: React.ChangeEvent<HTMLInputElement>): void {

        let parsed = parseFloat(e.target.value)
        setGravitationMax(parsed);

        updateGravitationMax(parsed);
    }

    function handleVelocityScaleChange(e: React.ChangeEvent<HTMLInputElement>): void {

        let parsed = parseFloat(e.target.value)
        setVelocityScale(parsed);

        updateVelocityScale(parsed);
    }

    return (
        <div className="optionsPanel">
            <h3>Options</h3>
            <div>
                <label htmlFor="gravitationScaleInput">Gravitation strength: </label>
                <input
                    type="number"
                    id="gravitationScaleInput"
                    name="gravitationScale"
                    min="0"
                    max="10000"
                    step="10"
                    defaultValue={initialGravitationScale}
                    onChange={e => handleGravitationScaleChange(e)}
                />
                <br/>
                <label htmlFor="gravitationMaxInput">Gravitation max force: </label>
                <input
                    type="number"
                    id="gravitationMaxInput"
                    name="gravitationMax"
                    min="0"
                    max="1"
                    step="0.0001"
                    defaultValue={initialGravitationMax}
                    onChange={e => handleGravitationMaxChange(e)}
                />
                <br/>
                <label htmlFor="velocityScaleInput">Velocity: </label>
                <input
                    type="number"
                    id="velocityScaleInput"
                    name="velocityScale"
                    min="0"
                    max="1"
                    step="0.0001"
                    defaultValue={initialVelocityScale}
                    onChange={e => handleVelocityScaleChange(e)}
                />
                <br />
                <input type="button" value="Clear" onClick={() => clearHandler()} />
            </div>

        </div>
  );
}

export default OptionsPanel;