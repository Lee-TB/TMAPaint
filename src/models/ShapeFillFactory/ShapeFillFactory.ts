import { ICircle } from '../ICircle';
import { IRectangle } from '../IRectangle';
import { IShapeFactory } from '../IShapeFactory';
import { CircleFill } from './CircleFill';
import { RectangleFill } from './RectangleFill';

export class ShapeFillFactory implements IShapeFactory {
    public createCircle(): ICircle {
        return new CircleFill();
    }

    public createRectangle(): IRectangle {
        return new RectangleFill();
    }
}
