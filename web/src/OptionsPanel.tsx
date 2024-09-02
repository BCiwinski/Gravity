import './OptionsPanel.css'

function OptionsPanel({
    gravitationScaleValue,
    gravitationScaleChangeHandler,
    gravitationMaxValue,
    gravitationMaxChangeHandler,
    velocityScaleValue,
    velocityScaleChangeHandler,
    clearHandler}:
    {
        gravitationScaleValue: number,
        gravitationScaleChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
        gravitationMaxValue : number
        gravitationMaxChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
        velocityScaleValue: number
        velocityScaleChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
        clearHandler: () => void
    }) {

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
                    defaultValue={gravitationScaleValue}
                    onChange={e => gravitationScaleChangeHandler(e)}
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
                    defaultValue={gravitationMaxValue}
                    onChange={e => gravitationMaxChangeHandler(e)}
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
                    defaultValue={velocityScaleValue}
                    onChange={e => velocityScaleChangeHandler(e)}
                />
                <br />
                <input type="button" value="Clear" onClick={() => clearHandler()} />
            </div>

        </div>
  );
}

export default OptionsPanel;