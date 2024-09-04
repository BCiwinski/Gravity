import { useEffect, useState, useId } from 'react'
import Option from './NumericOption'
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

    const [show, setShow] = useState(true);

    useEffect(() => {

        window.addEventListener('keydown', handleWindowKeydown);
        return () => { window.removeEventListener('keydown', handleWindowKeydown); };
        },
        []);

    function handleWindowKeydown(e: KeyboardEvent) {

        if (e.key == "o" || e.key == "O") {

            setShow(s => !s);
        }
    }

    return (
        <div className="optionsPanel" style={show ? { display: 'inline-block' } : {display: 'none'} }>
            <h2>Options</h2>
            <div className="options">
                <Option
                    id={useId()}
                    label="Gravitation strength"
                    initialValue={initialGravitationScale}
                    update={updateGravitationScale}
                    titleAtr="Overall gravitation strength. Most noticable over large distances."
                    maxValue={10000}
                    minValue={0}
                    step={10}
                />
                <Option
                    id={useId()}
                    label="Gravitation max force"
                    initialValue={initialGravitationMax}
                    update={updateGravitationMax}
                    titleAtr="Maximum attraction limiter, as a fraction of gravitation strength. Low values make close encounters more gentle."
                    maxValue={0.01}
                    minValue={0.0001}
                    step={0.0001}
                />
                <Option
                    id={useId()}
                    label="Velocity"
                    initialValue={initialVelocityScale}
                    update={updateVelocityScale}
                    titleAtr="Changes momentum/attraction ratio. High values make everything go super fast. Sudden change may cause an explosion!"
                    maxValue={1}
                    minValue={0.001}
                    step={0.001}
                />
            </div>
            <small>center on cursor with 'c'</small>
            <br />
            <small>press 'o' to hide</small>
            <input type="button" className="options" value="Clear stars" onClick={() => clearHandler()} />
        </div>
  );
}

export default OptionsPanel;