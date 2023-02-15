import { Circle } from './Circle';
import { Rectangle } from './Rectangle';

export interface ShapeFactory {
    createCircle(radius: number): Circle;
    createRectangle(width: number, height: number): Rectangle;
}
