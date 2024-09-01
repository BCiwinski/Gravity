import {useRef} from 'react'
import './SpaceCanvas.css'

function SpaceCanvas({ width, height }: { width: number, height: number }) : JSX.Element {

    const canvasRef = useRef(null);

    function handleClick(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {

        alert(`X: ${e.clientX}/${canvasRef.current.clientWidth} ,Y: ${e.clientY}/${canvasRef.current.clientHeight}`);
    }

    return (
        <canvas className="space" width={width} height={height} ref={canvasRef} onClick={e => {handleClick(e)} } ></canvas>
    );
}

export default SpaceCanvas;