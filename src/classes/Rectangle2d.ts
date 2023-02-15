import { Rectangle } from '../interfaces/Rectangle';

export class Rectangle2d implements Rectangle {
  private _width: number;
  private _height: number;

  constructor(width: number, height: number) {
    this._width = width;
    this._height = height;
  }

  public getArea(): number {
    return this._width * this._height;
  }
  public getPerimeter(): number {
    return (this._width + this._height) * 2;
  }
}
