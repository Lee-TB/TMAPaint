import { ICircle } from '../ICircle';
import { Point } from '../Point';
import { CanvasSingleton } from '../CanvasSingleton';

export class CircleStroke implements ICircle {
    constructor(private _startPosition: Point = new Point(0, 0), private _radius: number = 0) {}

    public getRadius(): number {
        return this._radius;
    }

    public setRadius(radius: number): void {
        this._radius = radius;
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
        CanvasSingleton.getInstance().isPainting = true;
        CanvasSingleton.getInstance().context.beginPath();
        this._startPosition = new Point(e.offsetX, e.offsetY);
    }

    private _handleMouseMove(e: MouseEvent): void {
        if (CanvasSingleton.getInstance().isPainting) {
        }
    }

    private _handleMouseUp(e: MouseEvent): void {
        this._radius =
            Math.max(
                Math.abs(e.offsetX - this._startPosition.getX()),
                Math.abs(e.offsetY - this._startPosition.getY())
            ) / 2;

        this._startPosition.setX((this._startPosition.getX() + e.offsetX) / 2);
        this._startPosition.setY((this._startPosition.getY() + e.offsetY) / 2);

        CanvasSingleton.getInstance().isPainting = false;
        CanvasSingleton.getInstance().context.arc(
            this._startPosition.getX(),
            this._startPosition.getY(),
            this._radius,
            0,
            2 * Math.PI
        );
        CanvasSingleton.getInstance().context.stroke();
        CanvasSingleton.getInstance().context.closePath();
    }
}
