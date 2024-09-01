const BytesPerPixel: number = 4;

export default class SpaceCanvasRenderer {

    #context: CanvasRenderingContext2D;

    #height: number;

    #width: number;

    #imageData: ImageData

    #data: Uint8ClampedArray

    #stars: Array<Star> = new Array<Star>

    constructor(context: CanvasRenderingContext2D){

        this.#context = context;
        this.#height = context.canvas.height;
        this.#width = context.canvas.width;

        this.#imageData = new ImageData(this.#width, this.#height);
        this.#data = this.#imageData.data;

        this.#stars.push(new Star(100, 100))
        this.#stars.push(new Star(150, 350))

        this.#render();
    }

    createStarAt(x: number, y: number): void {

        this.#stars.push(new Star(x, y));
        this.#render();
    }

    #render() {

        this.#stars.forEach(s => {

            const size = 25;

            for (let i = s.x; i < s.x + size; i++) {
                for (let j = s.y; j < s.y + size; j++) {

                    this.#setPixelValue(i, j, 255, 255, 255);
                }
            }
        })

        this.#context.putImageData(this.#imageData, 0, 0);
    }

    #getPixelPosition(x: number, y: number): number {

        return (y * this.#width + x) * BytesPerPixel;
    }

    #setPixelValue(x: number, y: number, red: number, green: number, blue: number, alpha : number = 255) {

        let position : number = this.#getPixelPosition(x, y);

        this.#data[position] = red;
        this.#data[position + 1] = green;
        this.#data[position + 2] = blue;
        this.#data[position + 3] = alpha;
    }
}

class Star {

    x: number;

    y: number;

    constructor(x: number, y: number) {

        this.x = x;
        this.y = y;
    }
}