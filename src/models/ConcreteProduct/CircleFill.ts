import { Circle } from '../AbstractProduct/Circle';
import { Shape } from '../AbstractProduct/Shape';
import { ShapeVariant } from '../enums/ShapeVariant';

export class CircleFill extends Circle {
    constructor(x: number, y: number, radius: number) {
        super(x, y, radius);
    }

    public getVariant(): ShapeVariant {
        return ShapeVariant.fill;
    }

    public clone(): Shape {
        return new CircleFill(this.getX(), this.getY(), this.getRadius());
    }
}
