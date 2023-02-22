import { CanvasSingleton } from '../CanvasSingleton';
import { IRectangle } from '../IRectangle';
import { Point } from '../Point';

export class RectangleStroke implements IRectangle {
    constructor(
        private _startPosition: Point = new Point(0, 0),
        private _width: number = 0,
        private _height: number = 0
    ) {}

    public getWidth(): number {
        return this._width;
    }

    public setWidth(width: number): void {
        this._width = width;
    }

    public getHeight(): number {
        return this._height;
    }

    public setHeight(height: number): void {
        this._height = height;
    }

    public paint(): void {
        CanvasSingleton.getInstance().canvas.addEventListener('mousedown', this._handleMouseDown);
        CanvasSingleton.getInstance().canvas.addEventListener('mousemove', this._handleMouseMove);
        CanvasSingleton.getInstance().canvas.addEventListener('mouseup', this._handleMouseUp);
    }

    public stopPaint(): void {
        CanvasSingleton.getInstance().canvas.removeEventListener(
            'mousedown',
            this._handleMouseDown
        );
        CanvasSingleton.getInstance().canvas.removeEventListener(
            'mousemove',
            this._handleMouseMove
        );
        CanvasSingleton.getInstance().canvas.removeEventListener('mouseup', this._handleMouseUp);
    }

    private _handleMouseDown(e: MouseEvent): void {
        CanvasSingleton.getInstance().isPainting = true;
        this._startPosition = new Point(e.offsetX, e.offsetY);
        CanvasSingleton.getInstance().context.beginPath();
    }

    private _handleMouseMove(e: MouseEvent): void {}

    private _handleMouseUp(e: MouseEvent): void {
        this._width = e.offsetX - this._startPosition.getX();
        this._height = e.offsetY - this._startPosition.getY();
        CanvasSingleton.getInstance().isPainting = false;
        CanvasSingleton.getInstance().context.strokeRect(
            this._startPosition.getX(),
            this._startPosition.getY(),
            this._width,
            this._height
        );
    }
}
