import { Rectangle } from '../AbstractProduct/Rectangle';
import { Point } from '../AbstractProduct/Point';

export class Rectangle3D extends Rectangle {
    constructor(location: Point = new Point(0, 0), width: number = 0, height: number = 0) {
        super(location, width, height);
    }

    paint(ctx: CanvasRenderingContext2D): void {
        console.log('Rectangle3D');
    }
}
