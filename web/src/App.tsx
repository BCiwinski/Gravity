import {useEffect, useRef } from 'react'
import OptionsPanel from './OptionsPanel'
import SpaceCanvas from './SpaceCanvas'
import SpaceCanvasRenderer from './SpaceCanvasRenderer'
import './App.css'

function App() : JSX.Element {

    const initialGravitationScale = 500;

    const initialGravitationMax = 0.0001;

    const initialVelocityScale = 0.2;

    const canvasRef = useRef(null);

    const rendererRef = useRef<SpaceCanvasRenderer | null>(null);

    useEffect(() => {

        if (rendererRef.current != null) {

            return;
        }

        if (canvasRef.current == null) {

            return;
        }

        rendererRef.current = new SpaceCanvasRenderer(
            canvasRef.current.getContext("2d"),
            initialGravitationScale,
            initialGravitationMax,
            initialVelocityScale);
    });

    function updateGravitationScale(value: number) : void {

        if (rendererRef.current != null) {

            rendererRef.current.gravitationScale = value;
        }
    }

    function updateGravitationMax(value: number): void {

        if (rendererRef.current != null) {

            rendererRef.current.gravitationMaxRatio = value;
        }
    }

    function updateVelocityScale(value: number): void {

        if (rendererRef.current != null) {

            rendererRef.current.velocityScale = value;
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
                rendererRef={rendererRef}
            />
            <OptionsPanel
                initialGravitationScale={initialGravitationScale}
                updateGravitationScale={updateGravitationScale}
                initialGravitationMax={initialGravitationMax}
                updateGravitationMax={updateGravitationMax}
                initialVelocityScale={initialVelocityScale}
                updateVelocityScale={updateVelocityScale}
                clearHandler={handleClearClick}
            />
        </div>
    )
}

export default App
