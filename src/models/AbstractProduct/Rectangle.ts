import { Shape } from './Shape';

export abstract class Rectangle extends Shape {
    private _width: number;
    private _height: number;

    constructor(x: number, y: number, width: number, height: number) {
        super(x, y);
        this._width = width;
        this._height = height;
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
