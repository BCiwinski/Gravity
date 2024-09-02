import React, { useState, useEffect, useRef } from 'react'
import OptionsPanel from './OptionsPanel'
import SpaceCanvas from './SpaceCanvas'
import SpaceCanvasRenderer from './SpaceCanvasRenderer'
import './App.css'

function App() {

    const [gravitationScale, setGravitationScale] = useState(200);

    const [gravitationMax, setGravitationMax] = useState(0.0005);

    const [velocityScale, setVelocityScale] = useState(0.02);

    const canvasRef = useRef(null);

    const rendererRef= useRef<SpaceCanvasRenderer | null>(null);

    useEffect(() => {

        if (rendererRef.current != null) {

            return;
        }

        if (canvasRef.current == null) {

            return;
        }

        rendererRef.current = new SpaceCanvasRenderer(canvasRef.current.getContext("2d"));
    });

    function handleGravitationScaleChange(e: React.ChangeEvent<HTMLInputElement>) : void {

        let parsed = parseInt(e.target.value)
        setGravitationScale(parsed);

        if (rendererRef.current != null) {

            rendererRef.current.gravitationScale = parsed;
        }
    }

    function handleGravitationMaxChange(e: React.ChangeEvent<HTMLInputElement>): void {

        let parsed = parseFloat(e.target.value)
        setGravitationMax(parsed);

        if (rendererRef.current != null) {

            rendererRef.current.gravitationMaxRatio = parsed;
        }
    }

    function handleVelocityScaleChange(e: React.ChangeEvent<HTMLInputElement>): void {

        let parsed = parseFloat(e.target.value)
        setVelocityScale(parsed);

        if (rendererRef.current != null) {

            rendererRef.current.velocityScale = parsed;
        }
    }

    function handleClearClick(): void {

        if (rendererRef.current != null) {

            rendererRef.current.clearStars();
        }
    }

    return (
        <div className="app">
            <SpaceCanvas
                height={1024}
                width={1024}
                canvasRef={canvasRef}
                renderer={rendererRef}
            />
            <OptionsPanel
                gravitationScaleValue={gravitationScale}
                gravitationScaleChangeHandler={handleGravitationScaleChange}
                gravitationMaxValue={gravitationMax}
                gravitationMaxChangeHandler={handleGravitationMaxChange}
                velocityScaleValue={velocityScale}
                velocityScaleChangeHandler={handleVelocityScaleChange}
                clearHandler={handleClearClick}
            />
        </div>
    )
}

export default App
