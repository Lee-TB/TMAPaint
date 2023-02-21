import { ICircle } from '../ICircle';
import { Point } from '../Point';
import { CanvasSingleton } from '../CanvasSingleton';

export class CircleStroke implements ICircle {
    private _startPosition!: Point;
    private _isPainting: boolean = false;

    constructor(private _radius: number = 0) {}

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
        CanvasSingleton.getInstance().context.arc(
            this._startPosition.getX(),
            this._startPosition.getY(),
            Math.max(
                e.offsetX - this._startPosition.getX(),
                e.offsetY - this._startPosition.getY()
            ),
            0,
            2 * Math.PI
        );
        CanvasSingleton.getInstance().context.stroke();
        CanvasSingleton.getInstance().context.closePath();
    }
}
