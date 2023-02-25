import { Point } from './Point';
import { Shape } from './Shape';

export abstract class Circle extends Shape {
    constructor(location: Point, private _radius: number) {
        super(location);
    }

    public getRadius(): number {
        return this._radius;
    }

    public setRadius(radius: number): void {
        this._radius = radius;
    }
}
