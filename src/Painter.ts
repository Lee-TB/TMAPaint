import { IShapeFactory } from './models/AbstractFactory/IShapeFactory';
import { Rectangle } from './models/AbstractProduct/Rectangle';
import { Circle } from './models/AbstractProduct/Circle';
import { ShapeType } from './models/enums/ShapeType';
import { Canvas } from './models/Canvas';

export interface PainterType {
    startPainting: Function;
    stopPaintingAll: Function;
    setScreen: Function;
}

export function Painter(shapeFactory: IShapeFactory): PainterType {
    const rectangle: Rectangle = <Rectangle>shapeFactory.createShape(ShapeType.rectangle);
    const circle: Circle = <Circle>shapeFactory.createShape(ShapeType.circle);

    function startPainting(shapeType: ShapeType) {
        // paint rectangle
        if (shapeType === ShapeType.rectangle) {
            rectangle.paintByMouse();
        }

        // paint circle
        if (shapeType === ShapeType.circle) {
            circle.paintByMouse();
        }
    }

    // stop all current mouse event
    function stopPaintingAll() {
        rectangle.stopPaintByMouse();
        circle.stopPaintByMouse();
    }

    // resize sreen
    function setScreen(width: number, height: number): void {
        Canvas.getInstance().canvasElement.width = width;
        Canvas.getInstance().canvasElement.height = height;
    }

    return { startPainting, stopPaintingAll, setScreen };
}
