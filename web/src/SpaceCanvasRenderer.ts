const BytesPerPixel: number = 4;

export default class SpaceCanvasRenderer {

    #context: CanvasRenderingContext2D;

    #height: number;

    #width: number;

    #imageData: ImageData;

    #data: Uint8ClampedArray;

    #stars: Array<Star> = new Array<Star>();

    gravitationScale: number = 500.0;

    velocityScale: number = 0.2;

    gravitationMaxRatio: number = 0.0001;

    #intervalId: number;

    #tickMs: number = 50;

    #offsetX: number = 0;

    #offsetY: number = 0;

    constructor(
        context: CanvasRenderingContext2D,
        gravitationScale: number,
        gravitationMaxRatio: number,
        velocityScale: number) {

        this.gravitationScale = gravitationScale;
        this.gravitationMaxRatio = gravitationMaxRatio;
        this.velocityScale = velocityScale;


        this.#context = context;
        this.#height = context.canvas.height;
        this.#width = context.canvas.width;

        this.#imageData = new ImageData(this.#width, this.#height);
        this.#data = this.#imageData.data;

        this.#stars.push(new Star(400, 100))
        this.#stars.push(new Star(550, 350))

        this.#render();

        this.#intervalId = setInterval(() => this.#tick(this.#tickMs), this.#tickMs);
    }

    createStarAt(x: number, y: number): void {

        this.#stars.push(new Star(x + this.#offsetX, y + this.#offsetY));
    }

    centerAt(x: number, y: number): void {

        this.#offsetX += x - (this.#width / 2);
        this.#offsetY += y - (this.#height / 2);
    }

    clearStars(): void {

        this.#stars = new Array<Star>();
    }

    #tick(deltaMs: number): void {

        this.#simulateGravitation(deltaMs);
        this.#simulateMovement(deltaMs);
        this.#render();
    }

    #simulateGravitation(deltaMs: number) : void {

        let old: Array<Star> = Array.from(this.#stars);

        for (let i = 0; i < this.#stars.length; i++) {

            for (let j = 0; j < old.length; j++) {

                if (i == j) {

                    continue;
                }

                let distanceSquared =
                    (old[j].x - this.#stars[i].x) * (old[j].x - this.#stars[i].x)
                    + (old[j].y - this.#stars[i].y) * (old[j].y - this.#stars[i].y);

                if (distanceSquared <= 0.01) {

                    continue;
                }

                let distance = Math.sqrt(distanceSquared);

                let directionX = (old[j].x - this.#stars[i].x) / distance;
                let directionY = (old[j].y - this.#stars[i].y) / distance;

                let force = Math.min((this.gravitationScale * deltaMs * this.velocityScale)/ distanceSquared, this.gravitationScale * this.gravitationMaxRatio);

                let dx = directionX * force;
                let dy = directionY * force;

                this.#stars[i].momentumX += dx;
                this.#stars[i].momentumY += dy;
            }
        }
    }

    #simulateMovement(deltaMs: number): void {

        this.#stars.forEach(s => {

            s.x += s.momentumX * deltaMs * this.velocityScale;
            s.y += s.momentumY * deltaMs * this.velocityScale;
        });
    }

    #render() {

        this.#setDataOpaqueBlack();

        this.#stars.forEach(s => {

            const size = 15;

            const brightness = 5;

            const starX = s.x - this.#offsetX;

            const starY = s.y - this.#offsetY;

            for (let x = Math.round(starX - size); x < Math.round(starX + size); x++) {
                for (let y = Math.round(starY - size); y < Math.round(starY + size); y++) {

                    let distanceSquared = ((starX - x) * (starX - x)) + ((starY - y) * (starY - y));

                    let value = Math.min((255 / distanceSquared) * brightness, 255);

                    this.#setPixelValue(x, y, value, value, value, true);
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
            this.#data[i + 3] = 255;
        }
    }

    #getPixelPosition(x: number, y: number): number {

        return (y * this.#width + x) * BytesPerPixel;
    }

    #setPixelValue(x: number, y: number, red: number, green: number, blue: number, colorAdditive: boolean = false, alpha: number = 255) {

        x = Math.round(x);
        y = Math.round(y);

        if (x < 0 || y < 0 || x >= this.#width || y >= this.#height) {

            return;
        }

        let position : number = this.#getPixelPosition(x, y);

        if (colorAdditive) {

            this.#data[position] = Math.min(this.#data[position] + red, 255);
            this.#data[position + 1] = Math.min(this.#data[position + 1] + green, 255);
            this.#data[position + 2] = Math.min(this.#data[position + 2] + blue, 255);
        }
        else {

            this.#data[position] = red;
            this.#data[position + 1] = green;
            this.#data[position + 2] = blue;
            this.#data[position + 3] = alpha;
        }
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