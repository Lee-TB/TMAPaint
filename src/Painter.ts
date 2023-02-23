import { IShapeFactory } from './models/AbstractFactory/IShapeFactory';
import { Circle } from './models/AbstractProduct/Circle';
import { Rectangle } from './models/AbstractProduct/Rectangle';
import { Shape } from './models/AbstractProduct/Shape';
import { CanvasSingleton } from './models/CanvasSingleton';
import { ShapeType } from './models/enums/ShapeType';
import { ShapeVariant } from './models/enums/ShapeVariant';

export interface PainterType {
    paint: Function;
    stopPaint: Function;
    setScreen: Function;
}

export function Painter(shapeFactory: IShapeFactory): PainterType {
    const rectangle: Rectangle = <Rectangle>shapeFactory.createShape(ShapeType.rectangle);
    const circle: Circle = <Circle>shapeFactory.createShape(ShapeType.circle);
    const history: Shape[] = [];

    let handleMouseDown: (e: MouseEvent) => void;
    let handleMouseMove: (e: MouseEvent) => void;
    let handleMouseUp: (e: MouseEvent) => void;

    function paint(shapeType: ShapeType) {
        // paint rectangle
        if (shapeType === ShapeType.rectangle) {
            // paint rectangle stroke
            if (rectangle.getVariant() === ShapeVariant.stroke) {
                handleMouseDown = (e: MouseEvent) => {
                    rectangle.setX(e.offsetX);
                    rectangle.setY(e.offsetY);
                    CanvasSingleton.getInstance().isPainting = true;
                    CanvasSingleton.getInstance().context.beginPath();
                };

                handleMouseMove = (e: MouseEvent) => {
                    if (CanvasSingleton.getInstance().isPainting) {
                    }
                };

                handleMouseUp = (e: MouseEvent) => {
                    rectangle.setWidth(e.offsetX - rectangle.getX());
                    rectangle.setHeight(e.offsetY - rectangle.getY());

                    CanvasSingleton.getInstance().isPainting = false;
                    CanvasSingleton.getInstance().context.strokeRect(
                        rectangle.getX(),
                        rectangle.getY(),
                        rectangle.getWidth(),
                        rectangle.getHeight()
                    );
                    history.push(rectangle);
                    console.log(history);
                };
            }

            // paint rectangle fill
            if (rectangle.getVariant() === ShapeVariant.fill) {
                handleMouseDown = (e: MouseEvent) => {
                    rectangle.setX(e.offsetX);
                    rectangle.setY(e.offsetY);
                    CanvasSingleton.getInstance().isPainting = true;
                    CanvasSingleton.getInstance().context.beginPath();
                };

                handleMouseMove = (e: MouseEvent) => {
                    if (CanvasSingleton.getInstance().isPainting) {
                    }
                };

                handleMouseUp = (e: MouseEvent) => {
                    rectangle.setWidth(e.offsetX - rectangle.getX());
                    rectangle.setHeight(e.offsetY - rectangle.getY());

                    CanvasSingleton.getInstance().isPainting = false;
                    CanvasSingleton.getInstance().context.fillRect(
                        rectangle.getX(),
                        rectangle.getY(),
                        rectangle.getWidth(),
                        rectangle.getHeight()
                    );
                    history.push(rectangle);
                    console.log(history);
                };
            }
        }

        // paint circle
        if (shapeType === ShapeType.circle) {
            // paint circle stroke
            if (circle.getVariant() === ShapeVariant.stroke) {
                handleMouseDown = (e: MouseEvent) => {
                    circle.setX(e.offsetX);
                    circle.setY(e.offsetY);
                    CanvasSingleton.getInstance().isPainting = true;
                    CanvasSingleton.getInstance().context.beginPath();
                };

                handleMouseMove = (e: MouseEvent) => {
                    if (CanvasSingleton.getInstance().isPainting) {
                    }
                };

                handleMouseUp = (e: MouseEvent) => {
                    circle.setRadius(
                        Math.max(
                            Math.abs(e.offsetX - circle.getX()),
                            Math.abs(e.offsetY - circle.getY())
                        ) / 2
                    );
                    circle.setX((circle.getX() + e.offsetX) / 2);
                    circle.setY((circle.getY() + e.offsetY) / 2);
                    CanvasSingleton.getInstance().isPainting = false;
                    CanvasSingleton.getInstance().context.arc(
                        circle.getX(),
                        circle.getY(),
                        circle.getRadius(),
                        0,
                        2 * Math.PI
                    );
                    CanvasSingleton.getInstance().context.stroke();
                    CanvasSingleton.getInstance().context.closePath();
                    history.push(circle);
                    console.log(history);
                };
            }

            // paint circle fill
            if (circle.getVariant() === ShapeVariant.fill) {
                handleMouseDown = (e: MouseEvent) => {
                    circle.setX(e.offsetX);
                    circle.setY(e.offsetY);
                    CanvasSingleton.getInstance().isPainting = true;
                    CanvasSingleton.getInstance().context.beginPath();
                };

                handleMouseMove = (e: MouseEvent) => {
                    if (CanvasSingleton.getInstance().isPainting) {
                    }
                };

                handleMouseUp = (e: MouseEvent) => {
                    circle.setRadius(
                        Math.max(
                            Math.abs(e.offsetX - circle.getX()),
                            Math.abs(e.offsetY - circle.getY())
                        ) / 2
                    );
                    circle.setX((circle.getX() + e.offsetX) / 2);
                    circle.setY((circle.getY() + e.offsetY) / 2);
                    CanvasSingleton.getInstance().isPainting = false;
                    CanvasSingleton.getInstance().context.arc(
                        circle.getX(),
                        circle.getY(),
                        circle.getRadius(),
                        0,
                        2 * Math.PI
                    );
                    CanvasSingleton.getInstance().context.fill();
                    CanvasSingleton.getInstance().context.closePath();
                    history.push(circle);
                    console.log(history);
                };
            }
        }

        CanvasSingleton.getInstance().canvas.addEventListener('mousedown', handleMouseDown);
        CanvasSingleton.getInstance().canvas.addEventListener('mousemove', handleMouseMove);
        CanvasSingleton.getInstance().canvas.addEventListener('mouseup', handleMouseUp);
    }

    function stopPaint() {
        CanvasSingleton.getInstance().canvas.removeEventListener('mousedown', handleMouseDown);
        CanvasSingleton.getInstance().canvas.removeEventListener('mousemove', handleMouseMove);
        CanvasSingleton.getInstance().canvas.removeEventListener('mouseup', handleMouseUp);
    }

    function setScreen(width: number, height: number): void {
        CanvasSingleton.getInstance().canvas.width = width;
        CanvasSingleton.getInstance().canvas.height = height;
    }

    return { paint, stopPaint, setScreen };
}
