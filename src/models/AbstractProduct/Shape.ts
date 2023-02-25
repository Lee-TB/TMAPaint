import { Point } from './Point';

export abstract class Shape {
    constructor(protected location: Point) {}
    abstract paint(ctx: CanvasRenderingContext2D): void;
    abstract clone(): Shape;

    public getLocation(): Point {
        return this.location;
    }

    public setLocation(location: Point): void {
        this.location = location;
    }
}
