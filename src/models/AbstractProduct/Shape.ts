import { ShapeVariant } from '../enums/ShapeVariant';
import { Point } from './Point';

export abstract class Shape extends Point {
    constructor(x: number, y: number) {
        super(x, y);
    }

    abstract getVariant(): ShapeVariant;
}
