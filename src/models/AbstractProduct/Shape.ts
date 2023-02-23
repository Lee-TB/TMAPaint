import { Point } from './Point';

export abstract class Shape extends Point {
    constructor(x: number, y: number) {
        super(x, y);
    }

    abstract paint(): void;
    abstract stopPaint(): void;
}
