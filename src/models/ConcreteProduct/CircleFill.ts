import { Circle } from '../AbstractProduct/Circle';
import { CanvasSingleton } from '../CanvasSingleton';

export class CircleFill extends Circle {
    constructor(x: number, y: number, radius: number) {
        super(x, y, radius);
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
        super.setX(e.offsetX);
        super.setY(e.offsetY);
        CanvasSingleton.getInstance().isPainting = true;
        CanvasSingleton.getInstance().context.beginPath();
    }

    private _handleMouseMove(e: MouseEvent): void {
        if (CanvasSingleton.getInstance().isPainting) {
        }
    }

    private _handleMouseUp(e: MouseEvent): void {
        super.setRadius(
            Math.max(Math.abs(e.offsetX - super.getX()), Math.abs(e.offsetY - super.getY())) / 2
        );

        super.setX((super.getX() + e.offsetX) / 2);
        super.setY((super.getY() + e.offsetY) / 2);

        CanvasSingleton.getInstance().isPainting = false;
        CanvasSingleton.getInstance().context.arc(
            super.getX(),
            super.getY(),
            super.getRadius(),
            0,
            2 * Math.PI
        );
        CanvasSingleton.getInstance().context.fill();
        CanvasSingleton.getInstance().context.closePath();
    }
}
