import { Circle } from './Circle';
import { Rectangle } from './Rectangle';

export interface ShapeFactory {
    createCircle(): Circle;
    createRectangle(width: number, height: number): Rectangle;
}
