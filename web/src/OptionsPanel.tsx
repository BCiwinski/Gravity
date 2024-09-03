import { useEffect, useState } from 'react'
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
    }): JSX.Element | null
{

    const [gravitationScale, setGravitationScale] = useState(initialGravitationScale);

    const gravitationScaleMax = 10000, gravitationScaleMin = 0;

    const [gravitationMax, setGravitationMax] = useState(initialGravitationMax);

    const gravitationMaxMax = 0.01, gravitationMaxMin = 0.0001;

    const [velocityScale, setVelocityScale] = useState(initialVelocityScale);

    const velocityScaleMax = 1, velocityScaleMin = 0.001;

    const [show, setShow] = useState(true);

    useEffect(() => {

        window.addEventListener('keydown', handleWindowKeydown);
        return () => { window.removeEventListener('keydown', handleWindowKeydown); };
    },
        [])

    function handleWindowKeydown(e: KeyboardEvent) {

        if (e.key == "o" || e.key == "O") {

            setShow(o => !o)
        }
    }

    function handleGravitationScaleChange(e: React.ChangeEvent<HTMLInputElement>): void {

        let parsed = parseInt(e.target.value)
        parsed = clampNumber(parsed, gravitationScaleMin, gravitationScaleMax);

        setGravitationScale(parsed);
        updateGravitationScale(parsed);
    }

    function handleGravitationMaxChange(e: React.ChangeEvent<HTMLInputElement>): void {

        let parsed = parseFloat(e.target.value)
        parsed = clampNumber(parsed, gravitationMaxMin, gravitationMaxMax)

        setGravitationMax(parsed);
        updateGravitationMax(parsed);
    }

    function handleVelocityScaleChange(e: React.ChangeEvent<HTMLInputElement>): void {

        let parsed = parseFloat(e.target.value)
        parsed = clampNumber(parsed, velocityScaleMin, velocityScaleMax);

        setVelocityScale(parsed);
        updateVelocityScale(parsed);
    }

    function clampNumber(number: number, rangeFrom: number, rangeTo: number): number {

        if (Number.isNaN(number)) {

            return rangeFrom;
        }

        if (number < rangeFrom) {

            return rangeFrom;
        }

        if (number > rangeTo) {

            return rangeTo;
        }

        return number;
    }

    if (!show) {
        return null;
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
                    value={clampNumber(gravitationScale, gravitationScaleMin, gravitationScaleMax)}
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
                    value={clampNumber(gravitationMax, gravitationMaxMin, gravitationMaxMax)}
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
                    step="0.001"
                    value={clampNumber(velocityScale, velocityScaleMin, velocityScaleMax)}
                    onChange={e => handleVelocityScaleChange(e)}
                />
            </div>
            <input type="button" className="options" value="Clear stars" onClick={() => clearHandler()} />
            <small>center on cursor with 'c'</small>
            <br />
            <small>press 'o' to hide</small>
        </div>
  );
}

export default OptionsPanel;