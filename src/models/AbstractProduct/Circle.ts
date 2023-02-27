import { Point } from './Point';
import { Shape } from './Shape';

export abstract class Circle extends Shape {
    constructor(location: Point, private _radius: number) {
        super(location);
    }

    /**
     *
     * @returns bán kính hình tròn
     */
    public getRadius(): number {
        return this._radius;
    }

    /**
     *
     * @param radius truyền vào bán kính
     */
    public setRadius(radius: number): void {
        this._radius = radius;
    }
}
