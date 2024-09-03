import {useEffect} from 'react'
import SpaceCanvasRenderer from './SpaceCanvasRenderer'
import './SpaceCanvas.css'

function SpaceCanvas({ width, height, canvasRef, rendererRef }: { width: number, height: number, canvasRef: React.MutableRefObject<null>, rendererRef: React.MutableRefObject<SpaceCanvasRenderer | null> }) : JSX.Element {

    let mouseClientX = 0;
    let mouseClientY = 0;

    useEffect(() => {

        window.addEventListener('keydown', handleWindowKeydown);
        return () => { window.removeEventListener('keydown', handleWindowKeydown); };
    },
        [])

    function handleWindowKeydown(e: KeyboardEvent) {

        if (e.key == "c" || e.key == "C") {

            if (rendererRef.current != null && canvasRef.current != null) {

                const canvasWidth = canvasRef.current.clientWidth;
                const canvasHeight = canvasRef.current.clientHeight;

                //since the canvas (usually) extendes beyond what user can see
                //their input needs to be adjusted in order to center
                //the image in the middle of the visible portion of the canvas
                const offsetX = (canvasWidth - window.innerWidth) / 2;
                const offsetY = (canvasHeight - window.innerHeight) / 2;

                const canvasXFraction = (mouseClientX + offsetX) / canvasWidth
                const canvasYFraction = (mouseClientY + offsetY) / canvasHeight

                const canvasX = canvasXFraction * canvasRef.current.width;
                const canvasY = canvasYFraction * canvasRef.current.height;

                rendererRef.current.centerAt(canvasX, canvasY);
            }
        }
    }

    useEffect(() => {

        window.addEventListener('mousemove', handleMouseMove);
        return () => { window.removeEventListener('mousemove', handleMouseMove); };
    },
        [])

    function handleMouseMove(e: MouseEvent) {

        mouseClientX = e.clientX;
        mouseClientY = e.clientY;
    }

    function handleClick(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {

        if (canvasRef.current == null) {

            return;
        }

        if (rendererRef.current == null) {

            return;
        }

        let canvasX = (e.clientX / canvasRef.current.clientWidth) * canvasRef.current.width;
        let canvasY = (e.clientY / canvasRef.current.clientHeight) * canvasRef.current.height;

        rendererRef.current.createStarAt(canvasX, canvasY);
    }

    return (
        <canvas className="space" width={width} height={height} ref={canvasRef} onClick={e => {handleClick(e)} } ></canvas>
    );
}

export default SpaceCanvas;