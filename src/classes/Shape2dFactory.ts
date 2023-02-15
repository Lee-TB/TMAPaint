import { Circle } from '../interfaces/Circle';
import { Rectangle } from '../interfaces/Rectangle';
import { ShapeFactory } from '../interfaces/ShapeFactory';
import { Circle2d } from './Circle2d';
import { Rectangle2d } from './Rectangle2d';

export class Shape2dFactory implements ShapeFactory {
    public createCircle(): Circle {
        return new Circle2d(50);
    }
    public createRectangle(width: number, height: number): Rectangle {
        return new Rectangle2d(width, height);
    }
}
