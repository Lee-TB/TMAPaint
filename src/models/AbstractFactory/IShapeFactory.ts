import { Shape } from '../AbstractProduct/Shape';
import { ShapeType } from '../enums/ShapeType';

export interface IShapeFactory {
    createShape(shapeType: ShapeType): Shape;
}
