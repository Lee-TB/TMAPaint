import { IRectangle } from '../IRectangle';
import { Point } from '../Point';
import { CanvasSingleton } from '../CanvasSingleton';

export class RectangleFill implements IRectangle {
    private _startPosition!: Point;
    private _isPainting!: boolean;

    constructor(private _width: number = 0, private _height: number = 0) {}

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

    stopPaint(): void {
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
        this._isPainting = true;
        this._startPosition = new Point(e.offsetX, e.offsetY);
        CanvasSingleton.getInstance().context.beginPath();
    }

    private _handleMouseMove(e: MouseEvent): void {
        if (this._isPainting) {
        }
    }

    private _handleMouseUp(e: MouseEvent): void {
        this._isPainting = false;
        CanvasSingleton.getInstance().context.fillRect(
            this._startPosition.getX(),
            this._startPosition.getY(),
            e.offsetX - this._startPosition.getX(),
            e.offsetY - this._startPosition.getY()
        );
    }
}
