import { Shape } from './Shape';
import { Point } from './Point';

export abstract class Rectangle extends Shape {
    constructor(location: Point, private _width: number, private _height: number) {
        super(location);
    }

    getWidth(): number {
        return this._width;
    }

    setWidth(width: number): void {
        this._width = width;
    }

    getHeight(): number {
        return this._height;
    }

    setHeight(height: number): void {
        this._height = height;
    }
}
