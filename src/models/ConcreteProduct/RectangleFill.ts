import { Rectangle } from '../AbstractProduct/Rectangle';
import { ShapeVariant } from '../enums/ShapeVariant';

export class RectangleFill extends Rectangle {
    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
    }

    getVariant(): ShapeVariant {
        return ShapeVariant.fill;
    }

    // public paint(): void {
    //     CanvasSingleton.getInstance().canvas.addEventListener('mousedown', this._handleMouseDown);
    //     CanvasSingleton.getInstance().canvas.addEventListener('mousemove', this._handleMouseMove);
    //     CanvasSingleton.getInstance().canvas.addEventListener('mouseup', this._handleMouseUp);
    // }

    // stopPaint(): void {
    //     CanvasSingleton.getInstance().canvas.removeEventListener(
    //         'mousedown',
    //         this._handleMouseDown
    //     );
    //     CanvasSingleton.getInstance().canvas.removeEventListener(
    //         'mousemove',
    //         this._handleMouseMove
    //     );
    //     CanvasSingleton.getInstance().canvas.removeEventListener('mouseup', this._handleMouseUp);
    // }

    // private _handleMouseDown(e: MouseEvent): void {
    //     super.setX(e.offsetX);
    //     super.setY(e.offsetY);
    //     CanvasSingleton.getInstance().isPainting = true;
    //     CanvasSingleton.getInstance().context.beginPath();
    // }

    // private _handleMouseMove(e: MouseEvent): void {
    //     if (CanvasSingleton.getInstance().isPainting) {
    //     }
    // }

    // private _handleMouseUp(e: MouseEvent): void {
    //     super.setWidth(e.offsetX - super.getX());
    //     super.setHeight(e.offsetY - super.getY());

    //     CanvasSingleton.getInstance().isPainting = false;
    //     CanvasSingleton.getInstance().context.fillRect(
    //         super.getX(),
    //         super.getY(),
    //         super.getWidth(),
    //         super.getHeight()
    //     );
    //     console.log(this);
    // }
}
