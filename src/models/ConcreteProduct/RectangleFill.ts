import { Rectangle } from '../AbstractProduct/Rectangle';
import { Shape } from '../AbstractProduct/Shape';
import { ShapeVariant } from '../enums/ShapeVariant';

export class RectangleFill extends Rectangle {
    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
    }

    public getVariant(): ShapeVariant {
        return ShapeVariant.fill;
    }

    public clone(): Shape {
        return new RectangleFill(this.getX(), this.getY(), this.getWidth(), this.getHeight());
    }
}
