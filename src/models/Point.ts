export class Point {
    private _x: number;
    private _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    public getX(): number {
        return this._x;
    }

    public setX(x: number): void {
        this._x = x;
    }

    public getY(): number {
        return this._y;
    }

    public setY(y: number): void {
        this._y = y;
    }
}
