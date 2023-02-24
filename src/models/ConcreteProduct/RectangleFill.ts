import { Rectangle } from '../AbstractProduct/Rectangle';
import { Shape } from '../AbstractProduct/Shape';
import { Canvas } from '../Canvas';
import { CanvasRenderer } from '../CanvasRenderer';
import { StateHistory } from '../StateHistory';

export class RectangleFill extends Rectangle {
    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
    }

    public clone(): Shape {
        return new RectangleFill(super.getX(), super.getY(), super.getWidth(), super.getHeight());
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
        super.setWidth(e.offsetX - super.getX());
        super.setHeight(e.offsetY - super.getY());

        Canvas.getInstance().isPainting = false;
        StateHistory.getInstance().pushUndoList(
            new RectangleFill(super.getX(), super.getY(), super.getWidth(), super.getHeight())
        );
        console.log(StateHistory.getInstance().getUndoList());
        CanvasRenderer.getInstance().render(StateHistory.getInstance().getUndoList());
        StateHistory.getInstance().clearRedoList();
    }
}
