import { Circle } from '../interfaces/Circle';
import { Rectangle } from '../interfaces/Rectangle';
import { ShapeFactory } from '../interfaces/ShapeFactory';

export class Client {
    private _factory: ShapeFactory;
    constructor(factory: ShapeFactory) {
        this._factory = factory;
    }

    circle(radius: number): Circle {
        return this._factory.createCircle(radius);
    }

    rectangle(width: number, height: number): Rectangle {
        return this._factory.createRectangle(width, height);
    }
}
