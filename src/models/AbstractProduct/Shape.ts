import { Point } from './Point';

export abstract class Shape {
    constructor(protected location: Point) {}
    abstract paint(ctx: CanvasRenderingContext2D): void;
    abstract clone(): Shape;

    /**
     *
     * @returns trả về một điểm
     */
    public getLocation(): Point {
        return this.location;
    }

    /**
     *
     * @param location truyền vào một điểm
     */
    public setLocation(location: Point): void {
        this.location = location;
    }
}
