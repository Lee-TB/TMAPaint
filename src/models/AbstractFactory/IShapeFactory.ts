import { Shape } from '../AbstractProduct/Shape';
import { ShapeType } from '../enums/ShapeType';

export interface IShapeFactory {
    /**
     * Hàm tạo shape
     * @param type
     */
    createShape(type: ShapeType): Shape;
}
