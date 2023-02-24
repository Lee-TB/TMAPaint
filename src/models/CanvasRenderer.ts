import { Canvas } from './Canvas';
import { Shape } from './AbstractProduct/Shape';
import { CircleFill } from './ConcreteProduct/CircleFill';
import { CircleStroke } from './ConcreteProduct/CircleStroke';
import { RectangleFill } from './ConcreteProduct/RectangleFill';
import { RectangleStroke } from './ConcreteProduct/RectangleStroke';
import { StateHistory } from './StateHistory';
import { stateHistoryElement } from '../htmlElements/stateHistoryElements';
import { Circle } from './AbstractProduct/Circle';
import { Rectangle } from './AbstractProduct/Rectangle';

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

        stateHistoryElement.innerHTML = StateHistory.getInstance()
            .getUndoList()
            .map((item) => {
                if (item instanceof Rectangle)
                    return `
                        <li>
                            <span>
                                <strong>Name : </strong>
                                <span>Rectangle</span>                    
                            </span>
                            <span>
                                <strong>X</strong>
                                <input value="${item.getX()}" size="3" maxlength="3"                    
                            </span>
                            <span>
                                <strong>Y</strong>
                                <input value="${item.getY()}" size="3" maxlength="3"                    
                            </span>
                            <span>
                                <strong>Width</strong>
                                <input value="${item.getWidth()}" size="3" maxlength="3"                    
                            </span>
                            <span>
                                <strong>Height</strong>
                                <input value="${item.getHeight()}" size="3" maxlength="3"                    
                            </span>
                        
                        </li>`;
                if (item instanceof Circle)
                    return `
                    <li>
                        <span>
                            <strong>Name : </strong>
                            <span>Circle</span>                    
                        </span>
                        <span>
                            <strong>X</strong>
                            <input value="${item.getX()}" size="3" maxlength="3"                    
                        </span>
                        <span>
                            <strong>Y</strong>
                            <input value="${item.getY()}" size="3" maxlength="3"                    
                        </span>
                        <span>
                            <strong>Radius</strong>
                            <input value="${item.getRadius()}" size="3" maxlength="3"                    
                        </span>
                    </li>`;
            })
            .join('');
    }
}
