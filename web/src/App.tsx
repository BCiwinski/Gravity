import { useState, useEffect, useRef } from 'react'
import OptionsPanel from './OptionsPanel'
import SpaceCanvas from './SpaceCanvas'
import SpaceCanvasRenderer from './SpaceCanvasRenderer'
import './App.css'

function App() {

    const [gravitationScale, setGravitationScale] = useState(200);

    const canvasRef = useRef(null);

    const renderer= useRef<SpaceCanvasRenderer | null>(null);

    useEffect(() => {

        if (renderer.current != null) {

            return;
        }

        if (canvasRef.current == null) {

            return;
        }

        renderer.current = new SpaceCanvasRenderer(canvasRef.current.getContext("2d"));
    });

    useEffect(() => {

        if (renderer.current == null) {

            return;
        }

        renderer.current.gravitationScale = gravitationScale;
    },
        [renderer]);

    function handleGravitationScaleChange(e: React.ChangeEvent<HTMLInputElement>) : void {

        let parsed = parseInt(e.target.value)
        setGravitationScale(parsed);

        if (renderer.current != null) {

            renderer.current.gravitationScale = parsed;
        }
    }

    return (
        <div className="app">
            <SpaceCanvas height={1024} width={1024} canvasRef={canvasRef} renderer={renderer.current}></SpaceCanvas>
            <OptionsPanel gravitationScaleValue={gravitationScale} gravitationScaleChangeHandler={handleGravitationScaleChange}></OptionsPanel>
        </div>
    )
}

export default App
