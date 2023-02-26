import { Circle } from '../AbstractProduct/Circle';
import { Point } from '../AbstractProduct/Point';
import { Shape } from '../AbstractProduct/Shape';

export class Circle3D extends Circle {
    constructor(location: Point = new Point(0, 0), radius: number = 0) {
        super(location, radius);
    }

    paint(ctx: CanvasRenderingContext2D): void {
        console.log('Circle3D');
    }

    clone(): Shape {
        return new Circle3D();
    }
}
