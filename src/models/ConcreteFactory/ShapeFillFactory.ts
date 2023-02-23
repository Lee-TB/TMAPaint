import { IShapeFactory } from '../AbstractFactory/IShapeFactory';
import { ICircle } from '../AbstractProduct/ICircle';
import { IRectangle } from '../AbstractProduct/IRectangle';
import { CircleFill } from '../ConcreteProduct/CircleFill';
import { RectangleFill } from '../ConcreteProduct/RectangleFill';

export class ShapeFillFactory implements IShapeFactory {
    public createCircle(): ICircle {
        return new CircleFill();
    }

    public createRectangle(): IRectangle {
        return new RectangleFill();
    }
}
