import { Shape } from './Shape';

export abstract class Circle extends Shape {
    private _radius: number;

    constructor(x: number, y: number, radius: number) {
        super(x, y);
        this._radius = radius;
    }

    public getRadius(): number {
        return this._radius;
    }

    public setRadius(radius: number): void {
        this._radius = radius;
    }
}
