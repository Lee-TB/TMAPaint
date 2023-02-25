import { Rectangle } from '../AbstractProduct/Rectangle';
import { Point } from '../AbstractProduct/Point';
import { Shape } from '../AbstractProduct/Shape';

export class Rectangle2D extends Rectangle {
    constructor(location: Point = new Point(0, 0), width: number = 0, height: number = 0) {
        super(location, width, height);
    }

    paint(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.strokeRect(
            this.location.getX(),
            this.location.getY(),
            this.getWidth(),
            this.getHeight()
        );
    }

    clone(): Shape {
        return new Rectangle2D();
    }
}
