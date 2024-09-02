const BytesPerPixel: number = 4;

export default class SpaceCanvasRenderer {

    #context: CanvasRenderingContext2D;

    #height: number;

    #width: number;

    #imageData: ImageData;

    #data: Uint8ClampedArray;

    #stars: Array<Star> = new Array<Star>();

    gravitationScale: number = 1000.0;

    #gravitationMax: number = 0.1;

    #intervalId: number;

    constructor(context: CanvasRenderingContext2D){

        this.#context = context;
        this.#height = context.canvas.height;
        this.#width = context.canvas.width;

        this.#imageData = new ImageData(this.#width, this.#height);
        this.#data = this.#imageData.data;

        this.#stars.push(new Star(400, 100))
        this.#stars.push(new Star(550, 350))

        this.#render();

        this.#intervalId = setInterval(() => this.#simulate(), 50);
    }

    createStarAt(x: number, y: number): void {

        this.#stars.push(new Star(x, y));
        this.#render();
    }

    #simulate() : void {

        let old: Array<Star> = Array.from(this.#stars);

        for (let i = 0; i < this.#stars.length; i++) {

            for (let j = 0; j < old.length; j++) {

                if (i == j) {

                    continue;
                }

                let distanceSquared =
                    (old[j].x - this.#stars[i].x) * (old[j].x - this.#stars[i].x)
                    + (old[j].y - this.#stars[i].y) * (old[j].y - this.#stars[i].y);

                let distance = Math.sqrt(distanceSquared);

                let directionX = (old[j].x - this.#stars[i].x) / distance;
                let directionY = (old[j].y - this.#stars[i].y) / distance;

                let dx = directionX * Math.min(this.gravitationScale / distanceSquared, this.#gravitationMax);
                let dy = directionY * Math.min(this.gravitationScale / distanceSquared, this.#gravitationMax);

                this.#stars[i].momentumX += dx;
                this.#stars[i].momentumY += dy;
            }
        }

        this.#stars.forEach(s => {

            s.x += s.momentumX;
            s.y += s.momentumY;
        });

        this.#render();
    }

    #render() {

        this.#setDataOpaqueBlack();

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

    #setDataOpaqueBlack() {

        for (let i = 0; i < this.#data.length; i += 4) {

            this.#data[i] = 0;
            this.#data[i + 1] = 0;
            this.#data[i + 2] = 0;
            this.#data[i + 2] = 1;
        }
    }

    #getPixelPosition(x: number, y: number): number {

        return (y * this.#width + x) * BytesPerPixel;
    }

    #setPixelValue(x: number, y: number, red: number, green: number, blue: number, alpha : number = 255) {

        x = Math.round(x);
        y = Math.round(y);

        if (x < 0 || y < 0 || x >= this.#width || y >= this.#height) {

            return;
        }

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

    momentumX: number = 0;

    momentumY: number = 0;

    constructor(x: number, y: number) {

        this.x = x;
        this.y = y;
    }
}