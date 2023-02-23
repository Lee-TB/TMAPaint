import { IShape } from './IShape';

export interface IRectangle extends IShape {
    getWidth(): number;
    setWidth(width: number): void;
    getHeight(): number;
    setHeight(height: number): void;
}
