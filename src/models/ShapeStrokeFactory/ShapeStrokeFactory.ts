import { ICircle } from '../ICircle';
import { IRectangle } from '../IRectangle';
import { IShapeFactory } from '../IShapeFactory';
import { CircleStroke } from './CircleStroke';
import { RectangleStroke } from './RectangleStroke';

export class ShapeStrokeFactory implements IShapeFactory {
    createCircle(): ICircle {
        return new CircleStroke();
    }

    createRectangle(): IRectangle {
        return new RectangleStroke();
    }
}
