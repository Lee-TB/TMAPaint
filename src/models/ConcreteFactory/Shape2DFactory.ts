import { IShapeFactory } from '../AbstractFactory/IShapeFactory';
import { Shape } from '../AbstractProduct/Shape';
import { Circle2D } from '../ConcreteProduct/Circle2D';
import { Rectangle2D } from '../ConcreteProduct/Rectangle2D';
import { ShapeType } from '../enums/ShapeType';

export class Shape2DFactory implements IShapeFactory {
    createShape(type: ShapeType): Shape {
        switch (type) {
            case ShapeType.rectangle:
                return new Rectangle2D();
            case ShapeType.circle:
                return new Circle2D();
            default:
                throw new Error('Create Shape2D fail!');
        }
    }
}
