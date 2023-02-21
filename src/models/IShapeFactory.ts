import { ICircle } from './ICircle';
import { IRectangle } from './IRectangle';

export interface IShapeFactory {
    createCircle(): ICircle;
    createRectangle(): IRectangle;
}
