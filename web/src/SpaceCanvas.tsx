import { useRef, useState, useEffect } from 'react'
import SpaceCanvasRenderer from './SpaceCanvasRenderer'
import './SpaceCanvas.css'

function SpaceCanvas({ width, height, canvasRef, renderer }: { width: number, height: number, canvasRef: React.MutableRefObject<null>, renderer: React.MutableRefObject<SpaceCanvasRenderer | null> }) : JSX.Element {

    function handleClick(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {

        if (canvasRef.current == null) {

            return;
        }

        if (renderer.current == null) {

            return;
        }

        let canvasX = Math.round((e.clientX / canvasRef.current.clientWidth) * canvasRef.current.width);
        let canvasY = Math.round((e.clientY / canvasRef.current.clientHeight) * canvasRef.current.height);

        renderer.current.createStarAt(canvasX, canvasY);
    }

    return (
        <canvas className="space" width={width} height={height} ref={canvasRef} onClick={e => {handleClick(e)} } ></canvas>
    );
}

export default SpaceCanvas;