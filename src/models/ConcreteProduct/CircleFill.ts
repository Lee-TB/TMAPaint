import { Circle } from '../AbstractProduct/Circle';
import { Shape } from '../AbstractProduct/Shape';
import { CanvasRenderer } from '../CanvasRenderer';
import { Canvas } from '../Canvas';
import { StateHistory } from '../StateHistory';

export class CircleFill extends Circle {
    constructor(x: number, y: number, radius: number) {
        super(x, y, radius);
    }

    public clone(): Shape {
        return new CircleFill(super.getX(), super.getY(), super.getRadius());
    }

    public paintByMouse(): void {
        Canvas.getInstance().canvasElement.addEventListener('mousedown', this._handleMouseDown);
        Canvas.getInstance().canvasElement.addEventListener('mousemove', this._handleMouseMove);
        Canvas.getInstance().canvasElement.addEventListener('mouseup', this._handleMouseUp);
    }

    public stopPaintByMouse(): void {
        Canvas.getInstance().canvasElement.removeEventListener('mousedown', this._handleMouseDown);
        Canvas.getInstance().canvasElement.removeEventListener('mousemove', this._handleMouseMove);
        Canvas.getInstance().canvasElement.removeEventListener('mouseup', this._handleMouseUp);
    }

    private _handleMouseDown(e: MouseEvent) {
        super.setX(e.offsetX);
        super.setY(e.offsetY);
        Canvas.getInstance().isPainting = true;
    }

    private _handleMouseMove(e: MouseEvent) {
        if (Canvas.getInstance().isPainting) {
        }
    }

    private _handleMouseUp(e: MouseEvent) {
        super.setRadius(
            Math.max(Math.abs(e.offsetX - super.getX()), Math.abs(e.offsetY - super.getY())) / 2
        );
        super.setX((super.getX() + e.offsetX) / 2);
        super.setY((super.getY() + e.offsetY) / 2);

        Canvas.getInstance().isPainting = false;
        StateHistory.getInstance().pushUndoList(
            new CircleFill(super.getX(), super.getY(), super.getRadius())
        );
        console.log(StateHistory.getInstance().getUndoList());
        CanvasRenderer.getInstance().render(StateHistory.getInstance().getUndoList());
        StateHistory.getInstance().clearRedoList();
    }
}
