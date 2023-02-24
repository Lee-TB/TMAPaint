import { CanvasSingleton } from './CanvasSingleton';
import { Shape } from './AbstractProduct/Shape';
import { CircleFill } from './ConcreteProduct/CircleFill';
import { CircleStroke } from './ConcreteProduct/CircleStroke';
import { RectangleFill } from './ConcreteProduct/RectangleFill';
import { RectangleStroke } from './ConcreteProduct/RectangleStroke';

export class Rerender {
    private _items!: Shape[];

    public render(items: Shape[]) {
        this._items = items;
        this._items.forEach((item) => {
            if (item instanceof RectangleStroke) {
                CanvasSingleton.getInstance().context.beginPath();
                CanvasSingleton.getInstance().context.strokeRect(
                    item.getX(),
                    item.getY(),
                    item.getWidth(),
                    item.getHeight()
                );
                CanvasSingleton.getInstance().context.closePath();
            }

            if (item instanceof RectangleFill) {
                CanvasSingleton.getInstance().context.beginPath();
                CanvasSingleton.getInstance().context.fillRect(
                    item.getX(),
                    item.getY(),
                    item.getWidth(),
                    item.getHeight()
                );
                CanvasSingleton.getInstance().context.closePath();
            }

            if (item instanceof CircleStroke) {
                CanvasSingleton.getInstance().context.beginPath();
                CanvasSingleton.getInstance().context.arc(
                    item.getX(),
                    item.getY(),
                    item.getRadius(),
                    0,
                    2 * Math.PI
                );
                CanvasSingleton.getInstance().context.stroke();
                CanvasSingleton.getInstance().context.closePath();
            }

            if (item instanceof CircleFill) {
                CanvasSingleton.getInstance().context.beginPath();
                CanvasSingleton.getInstance().context.arc(
                    item.getX(),
                    item.getY(),
                    item.getRadius(),
                    0,
                    2 * Math.PI
                );
                CanvasSingleton.getInstance().context.fill();
                CanvasSingleton.getInstance().context.closePath();
            }
        });
    }
}
