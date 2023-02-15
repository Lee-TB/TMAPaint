import { Rectangle } from '../interfaces/Rectangle';

export class Rectangle3d implements Rectangle {
    private _width: number;
    private _height: number;
    private _length: number;

    constructor(width: number = 0, height: number = 0, length: number = 0) {
        this._width = width;
        this._height = height;
        this._length = length;
    }

    public set(width: number, height: number, length: number): void {
        this._width = width;
        this._height = height;
        this._length = length;
    }

    public get(): Rectangle3d | undefined {
        return this;
    }

    public getArea(): number {
        return this._width * this._height * this._length;
    }

    public getPerimeter(): number {
        return (this._width + this._height) * this._length;
    }
}
