import { IShapeFactory } from './models/AbstractFactory/IShapeFactory';
import { Circle } from './models/AbstractProduct/Circle';
import { Rectangle } from './models/AbstractProduct/Rectangle';
import { CanvasSingleton } from './models/CanvasSingleton';
import { Rerender } from './models/Rerender';
import { ShapeType } from './models/enums/ShapeType';
import { ShapeVariant } from './models/enums/ShapeVariant';

export interface PainterType {
    paint: Function;
    stopPaint: Function;
    setScreen: Function;
}

export function Painter(shapeFactory: IShapeFactory): PainterType {
    const circle: Circle = <Circle>shapeFactory.createShape(ShapeType.circle);
    const rectangle: Rectangle = <Rectangle>shapeFactory.createShape(ShapeType.rectangle);
    const rerender = new Rerender();

    let handleMouseDown: (e: MouseEvent) => void;
    let handleMouseMove: (e: MouseEvent) => void;
    let handleMouseUp: (e: MouseEvent) => void;

    function paint(shapeType: ShapeType) {
        // paint rectangle
        if (shapeType === ShapeType.rectangle) {
            handleMouseDown = (e: MouseEvent) => {
                rectangle.setX(e.offsetX);
                rectangle.setY(e.offsetY);
                CanvasSingleton.getInstance().isPainting = true;
            };

            handleMouseMove = (e: MouseEvent) => {
                if (CanvasSingleton.getInstance().isPainting) {
                }
            };

            // paint rectangle stroke
            if (rectangle.getVariant() === ShapeVariant.stroke) {
                handleMouseUp = (e: MouseEvent) => {
                    CanvasSingleton.getInstance().isPainting = false;
                    rectangle.setWidth(e.offsetX - rectangle.getX());
                    rectangle.setHeight(e.offsetY - rectangle.getY());
                    CanvasSingleton.getInstance().undoList.push(rectangle.clone());
                    console.log(CanvasSingleton.getInstance().undoList);
                    rerender.render(CanvasSingleton.getInstance().undoList);
                };
            }

            // paint rectangle fill
            if (rectangle.getVariant() === ShapeVariant.fill) {
                handleMouseUp = (e: MouseEvent) => {
                    rectangle.setWidth(e.offsetX - rectangle.getX());
                    rectangle.setHeight(e.offsetY - rectangle.getY());

                    CanvasSingleton.getInstance().isPainting = false;
                    CanvasSingleton.getInstance().undoList.push(rectangle.clone());
                    console.log(CanvasSingleton.getInstance().undoList);
                    rerender.render(CanvasSingleton.getInstance().undoList);
                };
            }
        }

        // paint circle
        if (shapeType === ShapeType.circle) {
            handleMouseDown = (e: MouseEvent) => {
                circle.setX(e.offsetX);
                circle.setY(e.offsetY);
                CanvasSingleton.getInstance().isPainting = true;
            };

            handleMouseMove = (e: MouseEvent) => {
                if (CanvasSingleton.getInstance().isPainting) {
                }
            };

            // paint circle stroke
            if (circle.getVariant() === ShapeVariant.stroke) {
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
                    CanvasSingleton.getInstance().undoList.push(circle.clone());
                    console.log(CanvasSingleton.getInstance().undoList);
                    rerender.render(CanvasSingleton.getInstance().undoList);
                };
            }

            // paint circle fill
            if (circle.getVariant() === ShapeVariant.fill) {
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
                    CanvasSingleton.getInstance().undoList.push(circle.clone());
                    console.log(CanvasSingleton.getInstance().undoList);
                    rerender.render(CanvasSingleton.getInstance().undoList);
                };
            }
        }

        CanvasSingleton.getInstance().canvas.addEventListener('mousedown', handleMouseDown);
        CanvasSingleton.getInstance().canvas.addEventListener('mousemove', handleMouseMove);
        CanvasSingleton.getInstance().canvas.addEventListener('mouseup', handleMouseUp);
    }

    // remove paint event
    function stopPaint() {
        CanvasSingleton.getInstance().canvas.removeEventListener('mousedown', handleMouseDown);
        CanvasSingleton.getInstance().canvas.removeEventListener('mousemove', handleMouseMove);
        CanvasSingleton.getInstance().canvas.removeEventListener('mouseup', handleMouseUp);
    }

    // resize sreen
    function setScreen(width: number, height: number): void {
        CanvasSingleton.getInstance().canvas.width = width;
        CanvasSingleton.getInstance().canvas.height = height;
    }

    return { paint, stopPaint, setScreen };
}
