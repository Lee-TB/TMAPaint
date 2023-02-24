import { Circle } from '../AbstractProduct/Circle';
import { Shape } from '../AbstractProduct/Shape';
import { ShapeVariant } from '../enums/ShapeVariant';

export class CircleStroke extends Circle {
    constructor(x: number, y: number, radius: number) {
        super(x, y, radius);
    }

    public getVariant(): ShapeVariant {
        return ShapeVariant.stroke;
    }

    public clone(): Shape {
        return new CircleStroke(this.getX(), this.getY(), this.getRadius());
    }
}
