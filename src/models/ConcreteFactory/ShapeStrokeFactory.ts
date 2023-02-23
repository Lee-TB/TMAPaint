import { IShapeFactory } from '../AbstractFactory/IShapeFactory';
import { ICircle } from '../AbstractProduct/ICircle';
import { IRectangle } from '../AbstractProduct/IRectangle';
import { CircleStroke } from '../ConcreteProduct/CircleStroke';
import { RectangleStroke } from '../ConcreteProduct/RectangleStroke';

export class ShapeStrokeFactory implements IShapeFactory {
    createCircle(): ICircle {
        return new CircleStroke();
    }

    createRectangle(): IRectangle {
        return new RectangleStroke();
    }
}
