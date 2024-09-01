import { useRef, useState, useEffect } from 'react'
import SpaceCanvasRenderer from './SpaceCanvasRenderer'
import './SpaceCanvas.css'

function SpaceCanvas({ width, height }: { width: number, height: number }) : JSX.Element {

    const canvasRef = useRef(null);

    let context: CanvasRenderingContext2D;

    let canvasRenderer: SpaceCanvasRenderer

    useEffect(() => {

        if (canvasRenderer != null) {

            return;
        }

        if (canvasRef.current == null) {

            return;
        }

        canvasRenderer = new SpaceCanvasRenderer(canvasRef.current.getContext("2d"));
    })

    function handleClick(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {

        if (canvasRef.current == null) {

            return;
        }

        let canvasX = Math.round((e.clientX / canvasRef.current.clientWidth) * canvasRef.current.width);
        let canvasY = Math.round((e.clientY / canvasRef.current.clientHeight) * canvasRef.current.height);

        canvasRenderer.createStarAt(canvasX, canvasY);
    }

    return (
        <canvas className="space" width={width} height={height} ref={canvasRef} onClick={e => {handleClick(e)} } ></canvas>
    );
}

export default SpaceCanvas;