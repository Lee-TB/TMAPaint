import { Canvas } from './Canvas';
import { Shape } from './AbstractProduct/Shape';
import { CircleFill } from './ConcreteProduct/CircleFill';
import { CircleStroke } from './ConcreteProduct/CircleStroke';
import { RectangleFill } from './ConcreteProduct/RectangleFill';
import { RectangleStroke } from './ConcreteProduct/RectangleStroke';

export class CanvasRenderer {
    private static instance: CanvasRenderer;
    private _items!: Shape[];

    private constructor() {}

    public static getInstance(): CanvasRenderer {
        if (!CanvasRenderer.instance) {
            CanvasRenderer.instance = new CanvasRenderer();
        }

        return CanvasRenderer.instance;
    }

    public rerender(items: Shape[]) {
        Canvas.getInstance().context.clearRect(
            0,
            0,
            Canvas.getInstance().canvasElement.width,
            Canvas.getInstance().canvasElement.height
        );
        this.render(items);
    }

    public render(items: Shape[]) {
        this._items = items;
        this._items.forEach((item) => {
            if (item instanceof RectangleStroke) {
                Canvas.getInstance().context.beginPath();
                Canvas.getInstance().context.strokeRect(
                    item.getX(),
                    item.getY(),
                    item.getWidth(),
                    item.getHeight()
                );
                Canvas.getInstance().context.closePath();
            }

            if (item instanceof RectangleFill) {
                Canvas.getInstance().context.beginPath();
                Canvas.getInstance().context.fillRect(
                    item.getX(),
                    item.getY(),
                    item.getWidth(),
                    item.getHeight()
                );
                Canvas.getInstance().context.closePath();
            }

            if (item instanceof CircleStroke) {
                Canvas.getInstance().context.beginPath();
                Canvas.getInstance().context.arc(
                    item.getX(),
                    item.getY(),
                    item.getRadius(),
                    0,
                    2 * Math.PI
                );
                Canvas.getInstance().context.stroke();
                Canvas.getInstance().context.closePath();
            }

            if (item instanceof CircleFill) {
                Canvas.getInstance().context.beginPath();
                Canvas.getInstance().context.arc(
                    item.getX(),
                    item.getY(),
                    item.getRadius(),
                    0,
                    2 * Math.PI
                );
                Canvas.getInstance().context.fill();
                Canvas.getInstance().context.closePath();
            }
        });
    }
}
