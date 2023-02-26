import { Circle } from '../AbstractProduct/Circle';
import { Point } from '../AbstractProduct/Point';
import { Shape } from '../AbstractProduct/Shape';

export class Circle2D extends Circle {
    constructor(location: Point = new Point(0, 0), radius: number = 0) {
        super(location, radius);
    }

    paint(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.arc(
            this.location.getX(),
            this.location.getY(),
            this.getRadius(),
            0,
            2 * Math.PI,
            false
        );
        ctx.stroke();
    }

    clone(): Shape {
        return new Circle2D();
    }
}
