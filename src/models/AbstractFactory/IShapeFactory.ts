import { ICircle } from '../AbstractProduct/ICircle';
import { IRectangle } from '../AbstractProduct/IRectangle';

export interface IShapeFactory {
    createCircle(): ICircle;
    createRectangle(): IRectangle;
}
