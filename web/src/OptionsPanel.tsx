import './OptionsPanel.css'

function OptionsPanel({ gravitationScaleValue, gravitationScaleChangeHandler }: {gravitationScaleValue: number, gravitationScaleChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void}) {

    return (
        <div className="optionsPanel">
            <h3>Options</h3>
            <label htmlFor="gravitationScale">Gravitation strength: </label>
            <input type="number" name="gravitationScale" min="0" max="100000" value={gravitationScaleValue} onChange={e => gravitationScaleChangeHandler(e)}></input>
        </div>
  );
}

export default OptionsPanel;