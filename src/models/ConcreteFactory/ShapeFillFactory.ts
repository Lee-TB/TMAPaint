import { IShapeFactory } from '../AbstractFactory/IShapeFactory';
import { Shape } from '../AbstractProduct/Shape';
import { CircleFill } from '../ConcreteProduct/CircleFill';
import { RectangleFill } from '../ConcreteProduct/RectangleFill';
import { ShapeType } from '../enums/ShapeType';

export class ShapeFillFactory implements IShapeFactory {
    createShape(shapeType: ShapeType): Shape {
        switch (shapeType) {
            case ShapeType.circle:
                return new CircleFill(0, 0, 0);
            case ShapeType.rectangle:
                return new RectangleFill(0, 0, 0, 0);
            default:
                throw new Error('Create shape fail!');
        }
    }
}
