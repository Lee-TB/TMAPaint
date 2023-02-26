import { IShapeFactory } from '../AbstractFactory/IShapeFactory';
import { Shape } from '../AbstractProduct/Shape';
import { Circle3D } from '../ConcreteProduct/Circle3D';
import { Rectangle3D } from '../ConcreteProduct/Rectangle3D';
import { ShapeType } from '../enums/ShapeType';

export class Shape3DFactory implements IShapeFactory {
    createShape(type: ShapeType): Shape {
        switch (type) {
            case ShapeType.rectangle:
                return new Rectangle3D();
            case ShapeType.circle:
                return new Circle3D();
            default:
                throw new Error('Create Shape3D fail!');
        }
    }
}
