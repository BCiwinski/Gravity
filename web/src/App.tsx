import {useState, useEffect, useRef } from 'react'
import OptionsPanel from './OptionsPanel'
import SpaceCanvas from './SpaceCanvas'
import SpaceCanvasRenderer from './SpaceCanvasRenderer'
import './App.css'

function App() : JSX.Element {

    const initialGravitationScale = 200;

    const initialGravitationMax = 0.0005;

    const initialVelocityScale = 0.02;

    const canvasRef = useRef(null);

    const rendererRef = useRef<SpaceCanvasRenderer | null>(null);

    const [showOptions, setShowOptions] = useState(true);

    useEffect(() => {

        window.addEventListener('keydown', handleWindowKeydown);
        return () => { window.removeEventListener('keydown', handleWindowKeydown); };
    },
    [])

    function handleWindowKeydown(e: KeyboardEvent) {

        if (e.key == "o" || e.key == "O") {

            setShowOptions(o => !o)
        }
    }

    useEffect(() => {

        if (rendererRef.current != null) {

            return;
        }

        if (canvasRef.current == null) {

            return;
        }

        rendererRef.current = new SpaceCanvasRenderer(canvasRef.current.getContext("2d"));
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
                renderer={rendererRef}
            />
            {showOptions && <OptionsPanel
                initialGravitationScale={initialGravitationScale}
                updateGravitationScale={updateGravitationScale}
                initialGravitationMax={initialGravitationMax}
                updateGravitationMax={updateGravitationMax}
                initialVelocityScale={initialVelocityScale}
                updateVelocityScale={updateVelocityScale}
                clearHandler={handleClearClick}
            />}
        </div>
    )
}

export default App
