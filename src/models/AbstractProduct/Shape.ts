import { ShapeVariant } from '../enums/ShapeVariant';
import { Point } from './Point';

export abstract class Shape extends Point {
    constructor(x: number, y: number) {
        super(x, y);
    }

    abstract clone(): Shape;
    abstract paintByMouse(): void;
    abstract stopPaintByMouse(): void;
}
