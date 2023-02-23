import { IShapeFactory } from '../AbstractFactory/IShapeFactory';
import { Shape } from '../AbstractProduct/Shape';
import { CircleStroke } from '../ConcreteProduct/CircleStroke';
import { RectangleStroke } from '../ConcreteProduct/RectangleStroke';
import { ShapeType } from '../enums/ShapeType';

export class ShapeStrokeFactory implements IShapeFactory {
    createShape(shapeType: ShapeType): Shape {
        switch (shapeType) {
            case ShapeType.circle:
                return new CircleStroke(0, 0, 0);
            case ShapeType.rectangle:
                return new RectangleStroke(0, 0, 0, 0);
            default:
                throw new Error('Create shape fail!');
        }
    }
}
