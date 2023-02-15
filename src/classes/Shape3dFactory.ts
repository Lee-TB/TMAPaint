import { Circle } from '../interfaces/Circle';
import { Rectangle } from '../interfaces/Rectangle';
import { ShapeFactory } from '../interfaces/ShapeFactory';
import { Circle3d } from './Circle3d';
import { Rectangle3d } from './Rectangle3d';

export class Shape3dFactory implements ShapeFactory {
  public createCircle(): Circle {
    return new Circle3d(30);
  }
  public createRectangle(): Rectangle {
    return new Rectangle3d(1, 2, 3);
  }
}
